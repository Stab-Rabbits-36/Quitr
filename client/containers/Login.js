import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.scss';
const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('')
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if(!userName || !userPassword) {
      alert('Please enter a username and password.')
      return;
    }
    fetch('user/verification', {
      method: 'POST',
      body: JSON.stringify({
        username: userName,
        password: userPassword
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(data => data.json())
      .then(data => {
        if(data) {
          props.setUser(data)
          navigate('/info');
        } else {
          alert('Invalid username and password.');
        }
        setUserName('');
        setUserPassword('');
      })


  }
  
  return (
    <div id='login-body' className='input-box'>
        <h1>Welcome Back</h1>
        <form id='login-box' onSubmit = {handleSubmit}>
          <div id='login-boxes'>
              <div className='input-div'>
                <input type='username'
                placeholder='Username'
                name='username'
                className = "form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='input-div'>
                <input type='password'
                placeholder='Password'
                name='password'
                className = "form-input"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
          </div>
        <button type="submit">Login</button>
        </form>

    </div>
  )
}


export default Login;