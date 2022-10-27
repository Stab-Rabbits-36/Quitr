import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Chart from '../components/Chart'

const ChartContainer = (props) => {
  const [chartColors, setUserChartColors] = useState([]);
  useEffect(() => {
    const bColors = [ 
    ['rgba(238, 128, 91, 0.5)', 'rgba(63, 81, 120, 0.1)','rgba(134, 140, 246, 0.1)','rgba(202, 58, 161, 0.1)'],
    ['rgba(238, 128, 91, 0.5)','rgba(63, 81, 120, 0.5)','rgba(134, 140, 246, 0.2)','rgba(202, 58, 161, 0.2)'],
    ['rgba(238, 128, 91, 0.5)','rgba(63, 81, 120, 0.5)','rgba(134, 140, 246, 0.75)','rgba(202, 58, 161, 0.2)'],
    ['rgba(238, 128, 91, 0.5)','rgba(63, 81, 120, 0.5)','rgba(134, 140, 246, 0.75)',
    'rgba(202, 58, 161, 0.5)'],
    ]
    const points = props.points;
    if(points >= 0 && points < 250){
      setUserChartColors(bColors[0])
    }else if(points > 249 && points < 500){
      setUserChartColors(bColors[1])
    }else if(points > 499 && points < 750){
      setUserChartColors(bColors[2])
    }else if(points >=750){
      setUserChartColors(bColors[3])
    }

//need array of datasets
//conditionals that check the number of points and call setUserDataSet passing in the array element of the desired data set
  }, [props.points]);
  return(
    <div className='rightInfoBody'>
      <h2>Your Progress</h2>
      <Chart color={chartColors}/>
    </div>
  )
};

export default ChartContainer;
