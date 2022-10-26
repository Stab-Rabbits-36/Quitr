import './styles/app.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import CheckIn from './components/CheckIn';
import InformationContainer from './containers/InformationContainer'
import HeaderBar from "./components/HeaderBar";
import HabitSelectorContainer from "./containers/HabitSelectorContainer"
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
               {/*} <Route path='/' element={
                    <>
                        {firstTime ? <HabitSelectorContainer setter={setFirstTime} /> : null}
                        {!firstTime ? <CheckIn firstTime={firstTime} /> : null}
                    </>
                } /> */}
                <Route path ='/' element={<Login setUser={setUser}/>} />
                <Route path ='/signup' element={<SignUp />} />
                <Route path='/info' element={<InformationContainer />} />
            </Routes>
            </>
        </div>
    )
}


export default App