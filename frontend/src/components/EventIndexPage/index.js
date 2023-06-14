import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, fetchEventsWithSearchParams } from "../../store/events";
import EventList from "./EventList";
import './EventIndex.css';
import HomeImage from "../../assets/eventbrite_home.jpg";
import { TfiTicket } from 'react-icons/tfi';
import GitHubIcon from "../../assets/GithubMark.png";
import LinkedInIcon from "../../assets/LinkedinLogo.png";
import HomePageMobile from "../../assets/homePageMobile.png";
import { AiOutlineSearch } from 'react-icons/ai';

function EventIndexPage() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events ? Object.values(state.events) : []);
  // const deleted = useSelector(state => state.events.deleted);

  const [query, setQuery] = useState('');
  const [isQueryEmpty, setIsQueryEmpty] = useState(true);

  useEffect(() => {
    if (isQueryEmpty) {
      dispatch(fetchEvents());
    }
  }, [dispatch, isQueryEmpty]);

  const handleEventSearch = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      setIsQueryEmpty(true);
    } else {
      setIsQueryEmpty(false);
      dispatch(fetchEventsWithSearchParams(query));
    }
  };

  return (
    <>
    <div className="event-index-page">
      <div className="header-image">
        <img className="desktop" src={HomeImage} alt="home" />
        <img className="mobile" src={HomePageMobile} alt="home mobile" />
      </div>

      <form onSubmit={handleEventSearch}>
      <div className="search-bar">
        <div className="icon">
          <AiOutlineSearch className="search-icon"/>
        </div>
          <div className="search">
            <input
            type="text"
            placeholder="Search events"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      </form>

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
              events={isQueryEmpty ? events : events.filter(event =>
                Object.values(event).some(value =>
                  value.toString().toLowerCase().includes(query.toLowerCase())
                )
              )}
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
