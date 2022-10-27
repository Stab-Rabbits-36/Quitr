import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';


const Challenge = (props) => {
  const [checked, setChecked] = useState(false);

  return(
    <div className='upcomingInfo'>
      <input 
        type='checkbox'
        id={props.index}
        checked={props.complete}
        onChange={props.check}
        />
        <label>{props.challengeName}</label>
    </div>
  )
};

export default Challenge;