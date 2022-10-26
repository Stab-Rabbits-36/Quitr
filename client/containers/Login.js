import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('')

  const handleSubmit = e => {
    console.log(userName, userPassword);
    setUserName('');
    setUserPassword('');
  }
  return (
    <div id='login-body' className='input-box'>
        <h1>Welcome Back</h1>
        <form id='login-box' onSubmit = {handleSubmit}>
          <div id='login-boxes'>
              <div className='input-div'>
                <input type='username'
                placeholder='username'
                name='username'
                className = "form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='input-div'>
                <input type='password'
                placeholder='password'
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