import { Link, Redirect, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../store/session';
import thomasConger from '../assets/thomas-conger.jpg'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const sessionUser = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // return window.location.replace('/login')
    console.log('logging out')
  };

  function copyLiveLink () {
    const link = `https://locus-pocus.onrender.com/now-showing/${sessionUser.id}`
    return navigator.clipboard.writeText(link)
  }

  return (
    <>
      <img className='tiny-profile' src={thomasConger} onClick={openMenu}/>

      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-section">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <div className="dropdown-section">
            <h3>Quick Actions</h3>
            <ul>
              <Link to="/dashboard"><li>Dashboard</li></Link>
              <li onClick={copyLiveLink}>Copy your live link</li>
              <Link to="/dashboard"><li>View current responses</li></Link>
            </ul>
          </div>
          <div className="dropdown-section">
            <ul>
              <li className="attention" onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;


{/*
          <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          <li>
            <a href="/dashboard">
              <button>Dashboard</button>
            </a>
          </li>
        </ul> */}
