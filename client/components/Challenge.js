import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';


const Challenge = (props) => {
  const [checked, setChecked] = useState(false);

  return(
    <div className='upcomingInfo'>
        <label className='challengeLabel'>
          <input className='checkbox'
          type='checkbox'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          />{props.challengeName}
        </label>
    </div>
  )
};

export default Challenge;