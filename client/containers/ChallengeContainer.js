import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Challenge from '../components/Challenge'


const ChallengeContainer = (props) => {

  return(
    <div className='leftInfoBody'>
      <h2>Log Your Challenges</h2>
      <div>
        {props.challenges.map(e => {
            return(
              <Challenge description={e.description} id={e.challenge_id} challengeName={e.challenge_name} completeDate={e.completed_on_last_date} />
            )
          })
        }
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