import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/login"><button>Log In</button></NavLink>
        </li>
        <li>
          <NavLink to="/signup"><button>Sign Up</button></NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink  exact to="/">Locus Pocus</NavLink>
      </div>
      <ul className="navigation">
        <a href="https://linkedin.com/in/thomasconger" target="_blank">
          <button className="cta">Connect with the developer!</button>
        </a>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
