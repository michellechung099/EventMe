import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useSubmit } from "../../hooks";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addHours, format, getTime } from 'date-fns';
import { enUS } from 'date-fns/locale';
import LoginFormPage from "../LoginFormPage";
import { Redirect } from "react-router-dom";
import { GrImage } from 'react-icons/gr'
import { BiImage } from 'react-icons/bi'
import { useHistory } from "react-router-dom";
import { createEvent, updateEvent } from "../../store/events";
import './EventFormPage.css'
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import Select from 'react-select';
import { fetchEvent } from "../../store/events";
// import TicketFormPage from "../TicketFormPage";
// import { createTicket } from "../../store/tickets";

function EventFormPage() {
  // errors state that defaults to an empty array
  // submit handler that passes an object containing input values stored in state to createEvent and dispatch resulting thunk action

  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [startExactTime, setStartExactTime] = useState("");
  const [endExactTime, setEndExactTime] = useState("");
  const [startTime, onStartTimeChange] = useInput('');
  const [endTime, onEndTimeChange] = useInput('');

  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [ticketQuantity, onTicketQuantityChange] = useInput(0);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(()=> {
    if (eventId) {
      dispatch(fetchEvent(eventId));
    }
  }, [dispatch, eventId])

  const event = useSelector(state => state.events[eventId]);

  useEffect(()=> {
    if (event) {
      const startDate = new Date(event.startTime);
      const updateStartDate = new Date(startDate);
      const endDate = new Date(event.endTime);
      const updateEndDate = new Date(endDate);

      setStartDate(updateStartDate);
      setEndDate(updateEndDate);
      setTitle(event?.title);
      setEventType(event?.eventType);
      setCategory(event?.category);
      setLocation(event?.location);
      setSummary(event?.summary);
      setDescription(event?.description);
      setPhotoUrl(event?.photoUrl);
    }
  }, [event, startExactTime, endExactTime]);

  useEffect(()=> {
    if (event) {
      const startExactTime = event.startTime.split('T')[1].slice(0,5);
      setStartExactTime(startExactTime);
    }
  }, [event]);

  useEffect(()=> {
    if (event) {
      const endExactTime = event.endTime.split('T')[1].slice(0,5);
      setEndExactTime(endExactTime);
    }
  }, [event]);

  console.log(`title: ${title}`);

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      }
    }
  }

  const handleDateChange = (ranges) => {
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;

    if (dateField === 'start') {
      setStartDate(start);
    } else if (dateField === 'end') {
      setEndDate(end);
    }

    setIsModalOpen(false);
  };

  const getTimeOptions = () => {
    const options = [];

    for (let i=0; i < 24; i ++) {
      for (let j=0; j < 60; j+=30) {
        const hours = i < 10 ? `0${i}`: i;
        const minutes = j === 0 ? `00` : j;

        const time = `${hours}:${minutes}`;
        const period = i < 12 ? 'AM' : 'PM';

        options.push({
          value: time,
          label: `${i === 0 ? 12 : (i > 12 ? i - 12 : i)}:${minutes} ${period}`
        })
      }
    }
    return options;
  }

  const timeOptions = getTimeOptions();

  console.log(`event!!!: ${JSON.stringify(event)}`);

  const [errors, onSubmit] = useSubmit({
    createAction: () => {
      const formData = new FormData();

      const startDateTime = `${format(startDate, "yyyy-MM-dd")}T${startExactTime}:00`;
      const endDateTime = `${format(endDate, "yyyy-MM-dd")}T${endExactTime}:00`;

      formData.append('title', title);
      formData.append('eventType', eventType);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('startTime', startDateTime);
      formData.append('endTime', endDateTime);
      formData.append('summary', summary);
      formData.append('description', description);
      formData.append('ticketQuantity', ticketQuantity);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      console.log(`formData inside EventFormPage: ${formData}`)

      if (eventId) {
        formData.append('id', eventId);
        return updateEvent(formData, eventId);
      }

      return createEvent(formData);
    },
    onSuccess: () => {
      history.push(`/users/${sessionUser.id}/events`);
    }
  });

  if (!sessionUser) {
    return <Redirect to='/login' />;
  }


  if (event?.startTime) {
    console.log(`new Date(event.startTime): ${new Date(event.startTime)}`);
  }


  return (
    <>
    {/* <div className="sidebar">
      <li><NavLink className="info-link" to="/">Basic Info</NavLink></li>
      <li><NavLink className="details-link" to="/">Details</NavLink></li>
      <li><NavLink className="tickets-link" to="/">Tickets</NavLink></li>
      <li><NavLink className="publish-link" to="/">Publish</NavLink></li>
    </div> */}

    <div className="event-form-container">
      <form onSubmit={onSubmit} className="event-create-form">
        <ul>
          {errors.map((error, index) => <li key={index}>{error.message}</li>)}
        </ul>

        <div className="basic-info-header">

          <div className="header-text">
            <h1 className="basic-info-header">Basic Info</h1>
          </div>

          <div className="basic-info-directions">
            <span className="directions">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</span>
          </div>

          <div className="event-form-title">
            <label className="event-form-title-input-label">Event Title</label>
              <input
                className="event-form-title-input-box"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Be clear and descriptive."
              />
          </div>

          <div className="type">
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="">Type</option>
              <option value="Appearance or Signing">Appearance or Signing</option>
              <option value="Attraction">Attraction</option>
              <option value="Camp, Trip, or Retreat">Camp, Trip, or Retreat</option>
              <option value="Class, Training, or Workshop">Class, Training, or Workshop</option>
              <option value="Concert or Performance">Concert or Performance</option>
              <option value="Conference">Conference</option>
              <option value="Convention">Convention</option>
              <option value="Dinner or Gala">Dinner or Gala</option>
              <option value="Festival or Fair">Festival or Fair</option>
              <option value="Game or Competition">Game or Competition</option>
              <option value="Meeting or Networking Event">Meeting or Networking Event</option>
              <option value="Other">Other</option>
              <option value="Party or Social Gathering">Party or Social Gathering</option>
              <option value="Race or Endurance Event">Race or Endurance Event</option>
              <option value="Rally">Rally</option>
              <option value="Screening">Screening</option>
              <option value="Seminar or Talk">Seminar or Talk</option>
              <option value="Tour">Tour</option>
              <option value="Tournament">Tournament</option>
              <option value="Tradeshow, Consumer Show, or Expo">Tradeshow, Consumer Show, or Expo</option>
            </select>
          </div>

          <div className="category">
            <select value={category} onChange={(e)=> setCategory(e.target.value)}>
              <option value="">Category</option>
              <option value="Auto, Boat & Air">Auto, Boat & Air</option>
              <option value="Business & Professional">Business & Professional</option>
              <option value="Charity & Causes">Charity & Causes</option>
              <option value="Community & Culture">Community & Culture</option>
              <option value="Family & Education">Family & Education</option>
              <option value="Fashion & Beauty">Fashion & Beauty</option>
              <option value="Film, Media & Entertainment">Film, Media & Entertainment</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Government & Politics">Government & Politics</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Hobbies & Special Interest">Hobbies & Special Interest</option>
              <option value="Home & Lifestyle">Home & Lifestyle</option>
              <option value="Music">Music</option>
              <option value="Other">Other</option>
              <option value="Performing & Visual Arts">Performing & Visual Arts</option>
              <option value="Religion & Spirituality">Religion & Spirituality</option>
              <option value="School Activities">School Activities</option>
              <option value="Science & Technology">Science & Technology</option>
              <option value="Seasonal & Holiday">Seasonal & Holiday</option>
            </select>
          </div>
        </div>

        <div className="location-header">
          <div className="header-text">
            <h1 className="location-text">Location</h1>
          </div>
          <div className="location-directions">
            <span className="directions"> Help people in the area discover your event and let attendees know where to show up.
            </span>
          </div>
          <div className="event-form-venue-location">
            <label className="venue-location-input-label">Venue location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e)=> setLocation(e.target.value)}
                required
                placeholder="Search for a venue or address."
              />
          </div>
        </div>

        <div className="date-and-time-header">
          <div className="header-text">
            <h1 className="date-and-time-text">Date and time</h1>
          </div>
          <div className="date-and-time-directions">
            <span className="directions">Tell event-goers when your event starts and ends so they can make plans to attend.</span>
          </div>
          <div className="event-button">
            <div className="single-event-button">Single Event</div>
          </div>
          <div className="event-details">
            <span>Single event happens once and can last multiple days</span>
          </div>

          <div className="event-start-date">
            <label className="event-form-event-starts-input-label">Event Starts</label>
              <input
                type="text"
                name="startdate"
                value={format(startDate, "MM/dd/yyyy")}
                // value={event ? format(new Date(event.startTime), 'MM/dd/yyyy') : format(startDate, "MM/dd/yyyy")}
                onClick={() => {
                  setDateField('start');
                  setIsModalOpen(true);
                }}
              />
          </div>
          <div className="event-start-time">
            <select
              value={startExactTime}
              onChange={event => setStartExactTime(event.target.value)}
            >
              <option value="">Start Time</option>
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="event-end-date">
            <label className="event-form-event-ends-input-label">Event Ends</label>
              <input
                type="text"
                name="enddate"
                value={format(endDate, "MM/dd/yyyy")}
                onClick={() => {
                  setDateField('end');
                  setIsModalOpen(true);
                }}
              />
          </div>
          <div className="event-end-time">
            <select
              value={endExactTime}
              onChange={event => setEndExactTime(event.target.value)}
            >
              <option value="">End Time</option>
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Modal
            contentLabel="Date Range Picker Modal"
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <DateRange
              ranges={[{
                startDate: startDate,
                endDate: endDate,
                key: 'selection',
              }]}
              onChange={handleDateChange}
              months={1}
              direction="horizontal"
            />
          </Modal>
        </div>

        <div className="event-media-header">
          <div className="header-text">
            <h1 className="event-media-text">Event media</h1>
            <h3>Images</h3>
          </div>
          <div className="images-directions">
            <span className="directions">Add photos to show what your event will be about. You can upload up to 10 images.</span>
          </div>

          <div className="upload-image-box">
            {/* <div className="image-icon">
              <GrImage />
            </div> */}
            <div className="image-text">
              Drag and drop an image or
            </div>
            <div>
              {photoUrl ? (
                <div className="photo-preview">
                  <img src={photoUrl} height="200px" />
                </div>
              ): (
                <button className="upload">
                <BiImage className="small-image-icon"/>
                <span className="upload-image-text">Upload image</span>
                <input
                  type="file"
                // value={photoUrl}
                  onChange={handleFileChange}
                />
               </button>
              )}
            </div>
            {/* <button className="upload">
              <BiImage className="small-image-icon"/>
              <span className="upload-image-text">Upload image</span>
              <input
                type="file"
                // value={photoUrl}
                onChange={handleFileChange}
              />
            </button>
            {photoUrl && (
              <div className="photo-preview">
                <img src={photoUrl} height="200px" />
              </div>
            )} */}
          </div>
        </div>

        <div className="summary-header">
          <div className="header-text">
            <h1 className="summary-text">Summary</h1>
          </div>
          <div className="summary-directions">
            <span className="directions">Grab people's attention with a short description about your event. Attendees will see this at the top of your event page. (140 characters max)</span>
          </div>
          <label>
            <textarea
              type="text"
              value={summary}
              onChange={(e)=> setSummary(e.target.value)}
              required
              placeholder="Write a short event summary to get attendees excited."
            />
          </label>
        </div>

        <div className="description-header">
          <div className="header-text">
            <h1 className="description-text">Description</h1>
          </div>
          <div className="description-directions">
            <span className="directions">
              Add more details to your event like your schedule, sponsors, or featured guests.
            </span>
          </div>
          <label>
            <textarea
            type="textarea"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="publish-header">
          <div className="header-text">
            <h1 className="publish-text">Publish Your Event</h1>
          </div>
          <button className="publish-button">Publish</button>
        </div>

      </form>
    </div>
    </>
  )
}

export default EventFormPage;
