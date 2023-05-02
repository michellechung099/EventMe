import React from "react";
import './EventCard.css'
import { useHistory } from "react-router-dom";

function EventCard({event}){
  const {title, photoUrl, location, startTime } = event;
  const history = useHistory(); //get access to browser's history object (contains methods & properties to manipulate and interact with browser's history stack)
  // history stack: browser history (keeps track of user's navigation history -> sequence of URLs)

  const handleClick = e => {
    e.preventDefault();
    history.push(`events/${event.id}`)
    // when user clicks on the event title, navigate to a diff URL
    // add a new entry to history stack and update current location to new URL
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    return formatter.format(date);
  }

  return (
    <div className="event-card">
      <div className="event-card-image-container" onClick={handleClick}>
        {photoUrl && <img src={photoUrl} alt='event-photo'/>}
      </div>

      <div className="event-card-content-container">
        <div className="event-card-content">
          <div className="event-card-primary-content">
            <span className="event-title" onClick={handleClick}>{title}</span>
            <span className="event-time">{formatDate(startTime)}</span>
          </div>
          <div className="event-card-subcontent">
            <span className="event-location">{location}</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default EventCard;
