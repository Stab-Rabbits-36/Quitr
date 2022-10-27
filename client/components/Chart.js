import React from 'react';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Profile from '../containers/Profile'
import '../styles/form.scss';
import { redirect } from 'react-router-dom';


ChartJS.register(ArcElement, Tooltip, Legend);
//props.color passed down to Chart as an array of colors for the backgroundColor property value
// export const data = {
 
//   radius: '50%',
//   labels: ['Acolyte', 'Padawan', 'Jedi Knight', 'Jedi Master'],
//   datasets: [
//     {
//       data: [1,1,1,1],
     
//       backgroundColor: {color},
      
//       borderColor: [
//         'rgba(238, 128, 91, 1)',
//         'rgba(63, 81, 120, 1)',
//         'rgba(134, 140, 246, 1)',
//         'rgba(202, 58, 161, 1)'
//       ],
//       borderWidth: 1, 
//     }
  
//   ]

// }

const Chart = (props) => {
  const color = props.color;
  console.log('this is color' + color);
  const data = {
 
    radius: '50%',
    labels: ['Acolyte', 'Padawan', 'Jedi Knight', 'Jedi Master'],
    datasets: [
      {
        data: [1,1,1,1],
       
        backgroundColor: color,
        
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
  return <Doughnut data={data} />
};

export default Chart;
