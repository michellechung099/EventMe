import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useInput, useSubmit } from "../../hooks";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar } from "react-date-range";
import LoginFormPage from "../LoginFormPage";
import { Redirect } from "react-router-dom";
import { GrImage } from 'react-icons/gr'
import { BiImage } from 'react-icons/bi'
import { useHistory } from "react-router-dom";
import { createEvent } from "../../store/events";
import './EventFormPage.css'
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
// import TicketFormPage from "../TicketFormPage";
// import { createTicket } from "../../store/tickets";

function EventFormPage() {
  // create state values & render form inputs for title (text), type (dropdown), category (dropdown), location (text), startTime, endTime, recurring (checkbox), summary (text), ticketQuantity (number), photo, description(text area)
  // errors state that defaults to an empty array
  // submit handler that passes an object containing input values stored in state to createEvent and dispatch resulting thunk action

  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const { userId } = useParams();
  // const [ticketData, setTicketData] = useState();

  // const tickets = useSelector(state => state.tickets);

  const [title, onTitleChange] = useInput('');
  const [type, onTypeChange] = useInput('default');
  const [category, onCategoryChange] = useInput('');
  const [location, onLocationChange] = useInput('');
  const [startTime, onStartTimeChange] = useInput('');
  const [endTime, onEndTimeChange] = useInput('');
  const [summary, onSummaryChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [ticketQuantity, onTicketQuantityChange] = useInput(0);
  const [photoFile, setPhotoFile ] = useState(null);
  const [photoUrl, setPhotoUrl ] = useState(null);

  const [errors, onSubmit] = useSubmit({
    createAction: () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);
      formData.append('summary', summary);
      formData.append('description', description);
      formData.append('ticketQuantity', ticketQuantity);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      return createEvent(formData);
    },
    onSuccess: () => {
      history.push(`/users/${sessionUser.id}`);
    }
  });

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

  if (!sessionUser) {
    return <Redirect to='/login' />;
  }

  return (
    <>
    <div className="sidebar">
      <li><NavLink className="info-link" to="/">Basic Info</NavLink></li>
      <li><NavLink className="details-link" to="/">Details</NavLink></li>
      <li><NavLink className="tickets-link" to="/">Tickets</NavLink></li>
      <li><NavLink className="publish-link" to="/">Publish</NavLink></li>
    </div>

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
        <div className="title">
          <label>
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              required
              placeholder="Be clear and descriptive."
            />
          </label>
        </div>

        <div className="type">
          <select value={type} onChange={onTypeChange}>
            <option value="">Type</option>
            <option value="appearance">Appearance or Signing</option>
            <option value="attraction">Attraction</option>
            <option value="camp">Camp, Trip, or Retreat</option>
            <option value="class">Class, Training, or Workshop</option>
            <option value="concert">Concert or Performance</option>
            <option value="conference">Conference</option>
            <option value="convention">Convention</option>
            <option value="dinner">Dinner or Gala</option>
            <option value="festival">Festival or Fair</option>
            <option value="game">Game or Competition</option>
            <option value="meeting">Meeting or Networking Event</option>
            <option value="other">Other</option>
            <option value="party">Party or Social Gathering</option>
            <option value="race">Race or Endurance Event</option>
            <option value="rally">Rally</option>
            <option value="screening">Screening</option>
            <option value="seminar">Seminar or Talk</option>
            <option value="tour">Tour</option>
            <option value="tournament">Tournament</option>
            <option value="tradeshow">Tradeshow, Consumer Show, or Expo</option>
          </select>
        </div>

        <div className="category">
          <select value={category} onChange={onCategoryChange}>
            <option value="">Category</option>
            <option value="auto">Auto, Boat & Air</option>
            <option value="business">Business & Professional</option>
            <option value="charity">Charity & Causes</option>
            <option value="community">Community & Culture</option>
            <option value="family">Family & Education</option>
            <option value="fashion">Fashion & Beauty</option>
            <option value="film">Film, Media & Entertainment</option>
            <option value="food">Food & Drink</option>
            <option value="government">Government & Politics</option>
            <option value="health">Health & Wellness</option>
            <option value="hobbies">Hobbies & Special Interest</option>
            <option value="home">Home & Lifestyle</option>
            <option value="music">Music</option>
            <option value="other">Other</option>
            <option value="performing">Performing & Visual Arts</option>
            <option value="religion">Religion & Spirituality</option>
            <option value="school">School Activities</option>
            <option value="science">Science & Technology</option>
            <option value="seasonal">Seasonal & Holiday</option>
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
        <label className="venue-location">Venue location
          <input
            type="text"
            value={location}
            onChange={onLocationChange}
            required
            placeholder="Search for a venue or address."
          />
        </label>
      </div>

      <div className="date-and-time-header">
        <div className="header-text">
          <h1 className="date-and-time-text">Date and time</h1>
        </div>
        <div className="date-and-time-directions">
          <span className="directions">Tell event-goers when your event starts and ends so they can make plans to attend.</span>
        </div>
        <div className="event-button">

        </div>
        <div className="event-details">
          <span>Single event happens once and can last multiple days</span>
        </div>

        <div className="event-starts">
          <label>
            <input
              type="text"
              value={startTime}
              onChange={onStartTimeChange}
              placeholder="Event Starts"
            />
          </label>
        </div>

        <div className="event-ends">
          <label>
            <input
              type="text"
              value={endTime}
              onChange={onEndTimeChange}
              placeholder="Event Ends"
            />
          </label>
        </div>
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
          <button className="upload">
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
          )}
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
          <input
            type="text"
            value={summary}
            onChange={onSummaryChange}
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
          <input
          type="textarea"
          value={description}
          onChange={onDescriptionChange}
          />
        </label>
      </div>

      {/* <div className="tickets-header">
        <div className="header-text">
          <h1 className="ticket-text">Add Tickets</h1>
        </div>

        <label>
          <input
          type="number"
          value={ticketQuantity}
          onChange={onTicketQuantityChange}
          />
        </label>
      </div> */}

      <div className="publish-header">
        <div className="header-text">
          <h1 className="publish-text">Publish Your Event</h1>
        </div>
        <button className="publish-button">Publish</button>
      </div>

    </form>
    </>
  )
}

export default EventFormPage;
