import React from "react";
import './EventCard.css'

function EventCard({event}){
  const {title, photoUrl, location, startTime } = event;

  return (
    <div className="event-card">
      <div className="event-card-image-container">
        {photoUrl && <img src={photoUrl} alt='event-photo'/>}
      </div>

      <div className="event-card-content-container">
        <div className="event-card-content">
          <div className="event-card-primary-content">
            <span className="event-title">{title}</span>
            <span className="event-time">{startTime}</span>
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
