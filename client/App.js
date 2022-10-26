import './styles/app.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Profile from './containers/Profile'
import HeaderBar from "./components/HeaderBar";
import Login from './containers/Login';
import SignUp from './containers/SignUp';

const App = () => {
    //what hooks will we need? 
    const [firstTime, setFirstTime] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)
    const [hasCheckedIn, setHasCheckedIn] = useState(false)
    const [user, setUser] = useState({});

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // change this to g
    useEffect(() => {
        async function getUserData(){
            const { data } = await axios.get('/api/habit/1');
            if(data) setFirstTime(false)
            console.log(data)
        }
        getUserData();
    }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <div className="forBG">
            <>
            <HeaderBar />
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