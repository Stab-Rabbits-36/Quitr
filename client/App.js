import './styles/app.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Profile from './containers/Profile'
import HeaderBar from "./components/HeaderBar";
import Login from './containers/Login';
import SignUp from './containers/SignUp';



const App = () => {
    const [user, setUser] = useState({});

    const logout = e => {
        setUser({});
        console.log(user);
    }
    return (
        <div className="forBG">
            <>
                <HeaderBar logout={logout} user={user}/>
                <Routes> 
                    <Route path ='/signup' element={<SignUp />} />
                    <Route path='/info' element={<Profile user={user}/>} />
                    <Route path ='/' element={<Login setUser={setUser}/>} />
                </Routes>
            </>
        </div>
    )
}


export default App