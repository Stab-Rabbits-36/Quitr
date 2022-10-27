import React from 'react';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Profile from '../containers/Profile'
import '../styles/form.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  radius: '50%',
  labels: ['Acolyte', 'Padawan', 'Jedi Knight', 'Jedi Master'],
  datasets: [
    {
      data: [1, 1, 1, 1],
      backgroundColor: [
        'rgba(238, 128, 91, 0.5)',
        'rgba(63, 81, 120, 0.5)',
        'rgba(134, 140, 246, 0.75)',
        'rgba(202, 58, 161, 0.5)'
      ],
      borderColor: [
        'rgba(238, 128, 91, 1)',
        'rgba(63, 81, 120, 1)',
        'rgba(134, 140, 246, 1)',
        'rgba(202, 58, 161, 1)'
      ],
      borderWidth: 1,
        
    }
  
  ]

}

const Chart = (props) => {
  return <Doughnut data={data} />
};

export default Chart;

