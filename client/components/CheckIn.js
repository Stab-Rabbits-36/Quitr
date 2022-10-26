import React from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import axios from 'axios';
import '../styles/checkIn.scss';

const CheckIn = props => {
  useEffect(() => {
    async function checkedInCheck() {
      const { data } = await axios.get('/api/habit/1');
      if (data.has_daily_checkin){
          window.location = '/info'
      }
    }
    checkedInCheck();
  }, []);

  //onclick functionality needs to put request -- has_daily_checkin to true
  async function dailyCheckIn(){
    await axios.post('/api/habit/checkin', {userId: 1})
  }
  async function reset(){
    await axios.post('/api/habit/reset', {userId: 1})
  }

  return (
    <div className="checkIn">
      {props.firstTime ? (
        <h1>Are you ready to quit smoking!?</h1>
      ) : (
        <h1>Welcome back! Have you stayed away from your bad habit?</h1>
      )}
      <div className="checkInButtons">
        <Link to="/info">
          <button onClick={dailyCheckIn}>Yes</button>
          <button onClick={reset}>No :(</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckIn;
