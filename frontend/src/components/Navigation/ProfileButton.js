import { HiOutlineUserCircle } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // }

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // useEffect(()=> {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener('click', closeMenu);
  // }, [showMenu])

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  }

  return (
    <>
    <div className="right-side"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* <button onClick={openMenu} className="profile-block">
        <div className="dropdown-profile-icon">
          <HiOutlineUserCircle id="user-icon" />
        </div>
        <div className="dropdown-email">
          {user.email}
        </div>
      </button> */}
      <div className="profile-dropdown">
        <div className="dropdown-profile-icon">
          <HiOutlineUserCircle id="user-icon" />
        </div>
        <div className="dropdown-email">{user.email}</div>
      </div>
      {showMenu && (
      <div className="dropdown-content">
        <ul className='profile-dropdown'>
          <li>
            <NavLink to={`/users/${user.id}`}>Tickets</NavLink>
          </li>
          <li>
            <div onClick={logout}>Log Out</div>
          </li>
        </ul>
      </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
