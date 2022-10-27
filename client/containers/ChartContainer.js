import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Chart from '../Components/Chart'

const ChartContainer = (props) => {

  return(
    <div className='rightInfoBody'>
      <h2>Your Progress</h2>
      <Chart points={props.points}/>
    </div>
  )
};

export default ChartContainer;


