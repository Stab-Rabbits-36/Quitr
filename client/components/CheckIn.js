import React from 'react';
import '../styles/checkIn.scss';

const CheckIn = props => {
  return (
    <div className={`popup ${props.seen.toString()}`}>
      <div>
        <h1>Have you used nicotine today?</h1>
        <div className="checkInButtons">
          <button onClick={props.set}>Yes</button>
          <button onClick={props.set}>No</button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
