import { HiOutlineUserCircle } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { RxCaretDown } from 'react-icons/rx';

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  }

  return (
    <>
       <div className="right-side" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
        <div className="profile-dropdown">
          <div className="dropdown-profile-icon">
            <HiOutlineUserCircle id="user-icon" />
          </div>
          <div className="dropdown-email">{user.email}</div>
          <div className="dropdown-caret-icon">
            <RxCaretDown id="caret-icon" />
          </div>
        </div>
        {showMenu && (
        <div className="dropdown-content">
          <div className='profile-dropdown'>
            <div>
              <NavLink to={`/users/${user.id}/events`}>Manage my events</NavLink>
            </div>
            <div>
              <NavLink to={`/users/${user.id}`}>Tickets</NavLink>
            </div>
            <div>
              <NavLink to="logout" onClick={logout}>Log Out</NavLink>
            </div>
          </div>
        </div>
        )}
    </div>
    </>
  );
}

export default ProfileButton;
