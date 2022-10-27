import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';

//will accept url to display img

const Badge = (props) => {
  return(
    <div className='singleBadge'>
      <img src={props.url} />
    </div>
  )
};

export default Badge;