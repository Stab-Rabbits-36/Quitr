import React from 'react';
import { useState } from 'react';

import '../styles/checkIn.scss';

const CheckIn = props => {
  return (
    <div className={props.seen.toString()}>
      <h1>Have you used nicotine today?</h1>
      <div className="checkInButtons">
        <button onClick={e => props.setSeen(false)}>Yes</button>
        <button onClick={e => props.setSeen(false)}>No :(</button>
      </div>
    </div>
  );
};

export default CheckIn;
