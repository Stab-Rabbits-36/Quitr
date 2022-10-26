import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';


const ChallengesBox = (props) => {
  const [userChallenges, setUserChallenges] = useState([]);

  fetch(`/user/habits/daily`)
    .then(data => data.json())
    .then(data => {
      /** will return an array of objects with keys: 
       * _id, challenge_id, challenge_name, completed_on_last_date
      */
      //setUserChallenges = data
    })
    

  return(
    <div id='challenges-box'>
      <h2>Log Your Challenges</h2>
      data.map(e => {

      })
      <Challenge id={challenge_id} name={challenge_name} completeDate={completed_on_last_date}/>
    </div>
  )

};

export default ChallengesBox;