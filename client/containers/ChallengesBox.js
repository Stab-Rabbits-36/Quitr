import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Challenge from '../components/Challenge'

const obj = {
  challengeName: 'Call your mom',

}


const ChallengesBox = (props) => {
  const [userChallenges, setUserChallenges] = useState([]);

  fetch(`/user/habits/daily`)
    .then(data => data.json())
    .then(data => {
      /** will return an array of objects with keys: 
       * _id, challenge_id, challenge_name, completed_on_last_date
       data.map(e =>
      */
      //setUserChallenges = data
    })
    

  return(
    <div className='leftInfoBody'>
      <h2>Log Your Challenges</h2>
      
      <Challenge  challengeName={obj.challengeName} />
    </div>
  )

};
/*<Challenge id={challenge_id} challengeName={obj.challengeName} completeDate={completed_on_last_date}/>*/
export default ChallengesBox;