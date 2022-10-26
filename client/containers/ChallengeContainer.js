import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Challenge from '../components/Challenge'

const obj = {
  challengeName: 'Call your mom',

}


const ChallengeContainer = (props) => {
  const [userChallenges, setUserChallenges] = useState([]);

  fetch(`/challenges/recent/:user_id`)
    .then(data => data.json())
    .then(data => {
      /** will return an array of objects with keys: 
       * _id, challenge_id, challenge_name, completed_on_last_date
      */
      setUserChallenges(data); //sets the current state of userChallenges to be the array of 3 returned challengeobjects
    })
    
//userChallenges.map => maps the elements fromt the array in useState
  return(
    <div className='leftInfoBody'>
      <h2>Log Your Challenges</h2>
      <div>
      <Challenge challengeName={obj.challengeName} />
      </div>
    </div>
  )
};

// {userChallenges.map(e => {
//   return(
//     <Challenge  id={challenge_id} challengeName={challengeName} completeDate={completed_on_last_date} />
//   )
// })
// }
export default ChallengeContainer;