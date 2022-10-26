import React from 'react';
import { Link } from 'react-router-dom'

//edit Link - if streaks = 0, do not display 
const InformationHeader = (props) => {
    console.log('user: ', props.user);
    return (
        <div className="info-header">
            <h1>Welcome {props.user ? props.user.first_name  : null} {props.user ? props.user.last_name : null}</h1>
            <h2>Streak: {props.habit ? props.habit.quitLength.days : null} days</h2>
            <Link to = "/checkin" className="link bad">Break Your Streak</Link> 
            <h3>You are a Quitr <strong>{props.userBadge}</strong></h3>
        </div>
    )
}

export default InformationHeader;