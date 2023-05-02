import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import eventbriteLogo from '../../assets/eventbriteLogo.png';
import { AiOutlineSearch } from 'react-icons/ai'
import backgroundImage from "../../assets/home.png"

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <li><NavLink className="login-link" to="/login">Log In</NavLink></li>
        <li><NavLink className="signup-link" to="/signup">Sign Up</NavLink></li>
      </>
    );
  }

  return (
      <>
      <nav className="nav-header">
        <div className="left">
          <NavLink exact to="/">
            <img src={eventbriteLogo} alt="logo" className="logo" />
          </NavLink>
        </div>

        <div className="search-bar">
          <div className="icon">
            <AiOutlineSearch className="search-icon"/>
          </div>
          <div className="search">
            <input type="text" placeholder="Search events" className="search-input" />
          </div>
        </div>

        <ul className="nav-links">
          <li className="create-an-event">
            <NavLink exact to="/events/new">Create an event</NavLink>
          </li>
          <li className="session-links">{sessionLinks}</li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
