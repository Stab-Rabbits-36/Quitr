import React, { useEffect, useState } from 'react';
import InformationHeader from '../components/InformationHeader';
import '../styles/info.scss';
import CheckIn from '../components/CheckIn';
import ChallengeContainer from './ChallengeContainer';
import ChartContainer from './ChartContainer'

// This is the main container that will call the backend to pass the result of that information to the child components
const Profile = (props) => {
  /**
   * Habit needs to recieve a habit object with keys
   * { habit_name: string
   *   badge_name: string
   *   points: number
   *   points_for_badge: number (represnting how many total points are needed to level up)
   *   streak: number
   * }
   */
  const [habit, setHabit] = useState({
    habit_name: 'default',
    badge_name: 'Novice',
    points: 50,
    points_for_next_badge: 500,
    streak: 10,
  });

  /**
   * challenges - an array of 3 challenge objects with keys
   * { challenge_name: string
   *   description: string
   *   points: number (points earned on completion)
   *   completed_on_last_date: bool (represnts if it was completed today)
   *   challenge_id: number
   * }
   */
  const [challenges, setChallenges] = useState([
    { challenge_name: `Meditate for 20 minutes`, description: `Try to use a meditation app and turn your mind off.`, points: 10, completed_on_last_date: true, challenge_id: 2 },
    { challenge_name: `Call a family member`, description: `It's great to lean on your support network. Call a loved one.`, points: 10, completed_on_last_date: false, challenge_id: 3 },
    { challenge_name: `Go for a run`, description: `Exercise releases dopamine. When detoxing for nicotine, your dopamine levels are low. Go raise those levels.`, points: 20, completed_on_last_date: false, challenge_id: 4 },
  ]);

  /**
   * Controls the state of the popup. 
   * Popup does not appear unless the users streak is greater than zero. 
   */
  const [popup, setPopup] = useState(Boolean(habit.streak)); // if the habits streak = 0, do not display

  const handlePopupClick = e => {
    if(e.target.innerHTML === 'Yes'){
      /**
       * Fetch Request: Update the state of habit to streak: 0
       */
      fetch(`/habit/`, {
        method: 'PATCH',
        
      })
      setHabit({
        ...habit, 
        streak: 0
      })
      setPopup(false);
    } else { 
      setPopup(false);
    }
  }

  const checkChallenge = e => {
    // fetch to update points
    // fetch to update completed_on_last_date
    console.log(e);
    const update = [ ...challenges ];
    update[e.target.id].completed_on_last_date = true;
    setChallenges(update);
  }

  useEffect(() => {
    fetch(`/habit/${props.user._id}`)
      .then(data => data.json())
      .then(data => {
        setHabit(data);
      });
    // Fetch the challenges passing in user_id as parameter
  }, []);

  return (
    <div className={`profile`}>
      {habit.streak ? <CheckIn streak={habit.streak} seen={popup} set={handlePopupClick} />:null}
      <InformationHeader setPopup={setPopup} userBadge={habit.badge_name} user={props.user} habit={habit} />
      <div className="infoBody">
          <ChallengeContainer check={checkChallenge} challenges={challenges} points={habit.points} /> 
          <ChartContainer points={habit.points} />
      </div> 
    </div>
     
  );
};

export default Profile;
