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
        <NavLink className="nav-link" to="/login">Log In</NavLink>
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <ul className="nav-container">
        <li>
          <NavLink exact to="/">
            <img src={eventbriteLogo} alt="logo" className="logo"/>
          </NavLink>
        </li>
        <li className="search-bar">
          <AiOutlineSearch className="search-icon"/>
          <input type="text" placeholder="search events" className="search-input" />
        </li>
        <li className="session-links">{sessionLinks}</li>
      </ul>
    </>
  );
}

export default Navigation;
