import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/events";
import './EventShow.css'

function EventShowPage() {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const event = useSelector(state=> state.events[eventId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  useEffect(()=> {
    dispatch(fetchEvent(eventId));
  }, [eventId, dispatch])

  if (!event) {
    return null;
  }

  const {title, photoUrl, location, startTime, endTime, summary, userId, description } = event;

  return(
    <div className="event-show-page">
      <div className="main">
        <div className="event-image">
          {photoUrl && <img width="600" height="300" src={photoUrl} alt="event-photo" />}
        </div>
        <div className="event-details">
          <div className="event-details-main">
            <div className="event-details-top">
              <time className="start-date">{formatDate(startTime)}</time>
              <h1 className="event-title">{title}</h1>
              <strong className="event-summary">{summary}</strong>
            </div>
            <div className="event-details-when-where">
              <div className="when-where">
                <h2>When and where</h2>
              </div>
              <div className="date-time">
                <div className="detail-icon">

                </div>
                <div className="detail-content">
                  <div className="date-and-time">
                    <h3>Date and time</h3>
                  </div>
                  <time className="date">{formatDate(startTime)}</time>
                  {/* <time className="date">end: {formatDate(endTime)}</time> */}
                </div>
              </div>
              <div className="location">
                <div className="location-icon">

                </div>
                <div className="location-content">
                  <div className="location-title">
                    <h3>Location</h3>
                  </div>
                  <div className="location-details">
                    <p>{location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="event-details-refund">
              <h2>Refund Policy</h2>
              <div>
                "Refunds up to"
                <b>7 days</b>
                "before event"
              </div>
            </div>
            <div className="event-details-about">
              <div className="about-title">
                <h2>About this event</h2>
              </div>
              <div className="description">
                <p className="details">{description}</p>
              </div>
            </div>
          </div>
          <div className="event-details-aside">

          </div>
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  )
}

export default EventShowPage;
