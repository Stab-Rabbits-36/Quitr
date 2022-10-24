import "./app.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
//App.js will hold header & habit selector
import CheckIn from './components/CheckIn';
import InformationContainer from './containers/InformationContainer'
import HeaderBar from "./components/HeaderBar";
import HabitSelectorContainer from "./containers/HabitSelectorContainer"
const App = () => {
    //what hooks will we need? 
    const [firstTime, setFirstTime] = useState(false)
    const [checkedIn, setCheckedIn] = useState(true)


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //on useEffect, will need to check if user has checked in today. will involve call on backend & state
        //to maintain most likely for now
    useEffect(() => {
        async function firstTimeChecker() {
            const { data } = await axios.get('/api/habit/1');
            //need to check if data retrieved is populated
            //if not populated, setFirstTime(true); which would then display the Habit Selector, and not the CheckIn
            //if populated, only the CheckIn should render
            // if (!data) setFirstTime(true)
            // console.log(firstTime)

            //if !firstTime, then need to check if user has checked in today within user object
            //if has checked in, setCheckedIn(true) -> redirect to '/info' path
            //if hasnt checked in (default), CheckIn will display automatically
            if (!firstTime){
                setCheckedIn(true);
                window.location = '/info'
            }

            console.log(data)
        }
        firstTimeChecker()
    }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="forBG">
            <>
            <HeaderBar />
            <Routes>
                <Route path='/' element={
                    <>
                        <HabitSelectorContainer />
                        <CheckIn firstTime={firstTime} />
                    </>
                } />
                <Route path='/info' element={<InformationContainer />} />
            </Routes>
            </>
        </div>
    )
}



            {/* header component will go here <header.js />*/}
            {/* React router routes will go here, dont have to setup routes until later.*/}
            {/* -Habit selector will come first */}
            {/* -Then Check in component */}
            {/* -Then display component (do we seperate components within display?) */}





export default App