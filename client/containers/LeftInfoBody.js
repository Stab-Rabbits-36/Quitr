import React from 'react';
import QuitInfo from '../components/QuitInfo';
import UpcomingInfo from '../components/UpcomingInfo';
import HealthBenefits from '../components/HealthBenefits';

function LeftInfoBody(props) {
  console.log('LEFTINFOPROPS', props);
  return (
    <div className="leftInfoBody">
        <div className='left-up'>
          <UpcomingInfo />
        </div>
        <div className='up-down'>
            <HealthBenefits day={props.habit} fact={props.fact} />
        </div>
     </div>
  );
}

export default LeftInfoBody;
