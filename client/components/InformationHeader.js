import React from 'react';
import { Link } from 'react-router-dom'

//edit Link - if streaks = 0, do not display 
const InformationHeader = (props) => {
    console.log('user: ', props.user);
    return (
        <div className="info-header">
            <h1>Welcome {props.user.first_name} {props.user.last_name}</h1>
            <h2>Streak: {props.habit.streak} days</h2>
            {props.habit.streak ? <h3 onClick={props.setPopup} className="bad">Break Your Streak</h3> : null}
            <h3>You are a Quitr {props.userBadge} with {props.points}</h3>
        </div>
    )
}

export default InformationHeader;