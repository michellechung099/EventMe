import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import eventbriteLogo from '../../assets/eventbriteLogo.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} className="profile-dropdown" />
    );
  } else {
    sessionLinks = (
      <div className='loginlink-container'>
        <div className="login-link">
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className="signup-link">
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
      <>
      <nav className="nav-header">
        {/* <div className="left">
          <NavLink exact to="/">
            <img src={eventbriteLogo} alt="logo" className="logo" />
          </NavLink>
        </div> */}
        <div className="nav-left">
          <NavLink exact to="/">
            <h1 className="logo">eventme</h1>
          </NavLink>
          <div className="search-bar">
            <div className="icon">
              <AiOutlineSearch className="search-icon"/>
            </div>
            <div className="search">
              <input type="text" placeholder="Search events" className="search-input" />
            </div>
          </div>
        </div>


        <div className="right-side-nav">
          <div className="create-an-event">
            <div className="plus-sign">
              <AiOutlinePlus />
            </div>
            <div className="create-an-event-link">
              <NavLink exact to="/events/new">Create an event</NavLink>
            </div>
          </div>
          <div className="session-links">{sessionLinks}</div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
