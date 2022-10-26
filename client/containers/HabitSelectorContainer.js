import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HabitSelector() {
  const handleClick = async () => {
    await axios.post('/api/habit/create', { userId: 1, habitName: 'smoking' });
  };

  return (
    <div className="habit-selector">
      <p>Are you ready to QUITR?</p>
      <select className="bad-habits">
        <option>Smoking</option>
        <option>Smoking is the only option!</option>
      </select>
      <Link to="/info">
        <button onClick={handleClick} className="ready-to-quit">
          I'm ready to quit!
        </button>
      </Link>
    </div>
  );
}

export default HabitSelector;
