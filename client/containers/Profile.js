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

  const [habit, setHabit] = useState({});
  console.log('habit: ', habit);
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
      fetch(`/habit/streak`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }, 
        body: JSON.stringify({
          user_id: props.user._id,
        })
      }).then(data => data.json())
        .then(data => console.log(data));
      setHabit({
        ...habit,
        date_started: new Date(),
        streak: 0
      })
      setPopup(false);
    } else { 
      setPopup(false);
    }
  }

  const checkChallenge = e => {
    console.log(challenges[e.target.id].points, props.user._id);
    fetch(`/user/points`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }, 
      body: { 
        user_id: props.user._id,
        points: habit.points + challenges[e.target.id].points
      }
    }).then(data => data.json())
      .then(data => {
        setHabit({
          ...habit, 
          points: habit.points + challenges[e.target.id].points
        })
        // ----- Update the challenge done to 
        fetch(`/challenge/recent`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }, 
          body: {
            user_id: props.user._id,
            challenge_id: challenges[e.target.id].challenge_id
          }
        }).then(data => data.json())
          .then(data => {
            const update = [ ...challenges ];
            update[e.target.id].completed_on_last_date = true;
            setChallenges(update);
          })
          .catch(err => console.log(err));
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    fetch(`/habit/${props.user._id}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setHabit({
          ...data,
          date_started: new Date(data.date_started),
          streak: Math.ceil(Math.abs(new Date(Date.UTC(data.date_started))- new Date(Date.UTC())) / (1000 * 60 * 60 * 24)) ? Math.ceil(Math.abs(new Date(data.date_started) - new Date()) / (1000 * 60 * 60 * 24)) : 0
        })
      }).catch(err => console.log(err));

    // ----------------------------------------------------
    // Fetch the challenges passing in user_id as parameter
    // ----------------------------------------------------
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
