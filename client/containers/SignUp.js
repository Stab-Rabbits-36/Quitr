import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    //FETCH 'POST' create a user
    fetch('/user/create', {
      method: 'POST', 
      body: JSON.stringify({
        username: username, 
        password: password,
        confirmPassword: confirmPassword,
        first_name: firstname,
        last_name: lastname
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
      .then(data => data.json())
      .then(data => {
        if(data) {
          //  -------------------------------------------------------
          //  -------- FETCH AGAIN - CREATE NEW USER HABIT ----------
          //  -------------------------------------------------------
          navigate('/')
        } else {
          alert('Failed');
        }
        console.log(username, password, confirmPassword);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setFirstname('');
        setLastname('');
      }).catch(err => console.log(err));
    //if successful - fetch 'POST' create a user nicotine habit
    //if successful - redirect to login page 


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
        <div className="input-div">
          <input 
            type = "text"
            className = "form-input"
            placeholder = "First Name"
            value = {firstname}
            onChange = {e => setFirstname(e.target.value)}
          />
        </div>
        <div className="input-div">
          <input 
            type = "text"
            className = "form-input"
            placeholder = "Last Name"
            value = {lastname}
            onChange = {e => setLastname(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}


export default SignUp;