import React from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';

const HeaderBar = (props) => {
  return (
    <div className='headertest'>
      <img src='https://media.discordapp.net/attachments/1033026342125584395/1033402686793580564/Quitr-logo.png?width=790&height=889' alt="logo"/>
      <nav className="header-links">
        <Link to = "/signup" className="link">Sign Up</Link>
        {props.user._id !== undefined ? <Link to = "/" className="link">Logout</Link> : <Link to = "/" onClick={props.logout} className="link">Login</Link> }
      </nav>
    </div>
  );
};

export default HeaderBar;
