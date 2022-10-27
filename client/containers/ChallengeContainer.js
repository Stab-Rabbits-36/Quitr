import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/form.scss';
import Challenge from '../components/Challenge';
import Badge from '../components/Badge'


const ChallengeContainer = (props) => {
  const[badges, setUserBadges] = useState([]);//use effect => import useEffect and look up syntax
  //write function to check points and update state accordingly
  console.log(badges);
  useEffect(() => {
    const imgArray = ['https://cdn.discordapp.com/attachments/1022845969076850760/1035215304084697148/acolyte-resize-crop.png', 'https://cdn.discordapp.com/attachments/1022845969076850760/1035216286227120208/padawan-resize-crop.png', 'https://cdn.discordapp.com/attachments/1022845969076850760/1035217454022004736/jedi-knight-resize-crop.png', 'https://cdn.discordapp.com/attachments/1022845969076850760/1035217454537916446/jedi-master-resize-crop.png'];
    const points = props.points;
    if(points > 0 && points < 250){
      setUserBadges([imgArray[0]])
    }else if(points > 249 && points < 500){
      setUserBadges([imgArray[0], imgArray[1]])
    }else if(points > 499 && points < 750){
      setUserBadges([imgArray[0], imgArray[1], imgArray[2]])
    }else if(points <=750){
      setUserBadges([imgArray[0], imgArray[1], imgArray[2], imgArray[3]])
    }
  }, []);
  return(
    <div className='leftInfoBody'>
      <h2>Log Your Challenges</h2>
      <div>
        {props.challenges.map((e,i)=> {
            return(
              <Challenge check={props.check} key={'c' + i.toString()} index={i} description={e.description} id={e.challenge_id} challengeName={e.challenge_name} complete={e.completed_on_last_date} />
            )
          })
        }
      </div>
      <div className='badgesDisplay'>
        {badges.map(url => {
            return(
              <Badge url={url} />
            )
          })
        }
      </div>
    </div>
  )
};


export default ChallengeContainer;