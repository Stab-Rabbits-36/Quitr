import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, confirmPassword);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div id="signup-form" className="input-box">
      <h1>Join Quitr</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <input 
            type = "text"
            className = "form-input"
            placeholder = "Username"
            value = {username}
            onChange = {e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-div">
          <input 
            type = "password"
            className = "form-input"
            placeholder = "Password"
            value = {password}
            onChange = {e => setPassword(e.target.value)}  
          />
        </div>
        <div className="input-div">
          <input 
            type = "password"
            className = "form-input"
            placeholder = "Confirm Password"
            value = {confirmPassword}
            onChange = {e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}


export default SignUp;