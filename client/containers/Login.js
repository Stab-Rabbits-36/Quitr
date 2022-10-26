import React from 'react';
import { useState, useEffect } from 'react';
const [userName, setUserName] = useState('');
const [userPassword, setUserPassword] = useState('')

const Login = (props) => {
  return (
    <div id='login-body'>
      <HeaderBar />
        <form id='login-box' onSubmit={setUser}>
          <span className='primary-text'>LOGIN</span>
          <div id='login-boxes'>
              <div>
                <input type='username'
                placeholder='username'
                name='username'
                className='login-input'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <input type='password'
                placeholder='password'
                name='password'
                className='login-input'
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
          </div>

        </form>

    </div>
  )
}


export default Login;