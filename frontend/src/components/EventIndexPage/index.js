import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../store/events";
import EventList from "./EventList";
import './EventIndex.css'
import HomeImage from "../../assets/eventbrite_home.jpg"

function EventIndexPage() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events ? Object.values(state.events) : []);
  // const deleted = useSelector(state => state.events.deleted);


  useEffect(()=>{
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
    <div className="event-index-page">
      <div className="header-image">
        <img src={HomeImage} alt="home" />
      </div>

      <div className="event-list-container">
        <div className="bucket-content">
          <div className="bucket-header">
            <h3 className='bucket-text'>Events in San Francisco</h3>
          </div>
          <div className="bucket-cards-container">
            <EventList
              events={events}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EventIndexPage;
