import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../store/events";
import EventList from "./EventList";
import './EventIndex.css';
import HomeImage from "../../assets/eventbrite_home.jpg";
import { TfiTicket } from 'react-icons/tfi';
import GitHubIcon from "../../assets/GithubMark.png";
import LinkedInIcon from "../../assets/LinkedinLogo.png";

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
            <div className="event-list-ticket-icon">
              <TfiTicket />
            </div>
            <div className="bucket-text">
              <h3>Events in San Francisco</h3>
            </div>
          </div>
          <div className="bucket-cards-container">
            <EventList
              events={events}
            />
          </div>
        </div>
      </div>

      <div className="my-links">
        <a href="https://github.com/michellechung099">
          <div className="github-icon">
              <img src={GitHubIcon} alt="github" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/michelle-chung-3a915a134/">
          <div className="linkedin-icon-link">
            <img src={LinkedInIcon} alt="linkedin-icon" />
          </div>
        </a>
      </div>
    </div>
    </>
  )
}

export default EventIndexPage;
