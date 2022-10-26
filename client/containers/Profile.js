import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InformationHeader from '../components/InformationHeader';
import '../styles/info.scss';
import CheckIn from '../components/CheckIn';
import ChallengeContainer from './ChallengeContainer'

// This is the main container that will call the backend to pass the result of that information to the child components
const Profile = (props) => {
  const [habit, changeHabit] = useState();
  const [fakeUser, changeUser] = useState();
  const [popup, setPopup] = useState(true); // if the habits streak = 0, do not display

  // setPopup(Boolean(streaks)) - if the streak zero, the popup doesn't come up

  const handlePopupClick = e => {
    if(e.target.innerHTML === 'Yes'){
      //FETCH - update streaks to zero 
      setPopup(false);
    } else { 
      setPopup(false);
    }
  }

  useEffect(() => {
    // this calls the backend to get the habit, user, and corresponding fact.
    // Due to lack of user auth userId 1 is hardcoded in most places.
    const getHabit = async () => {
      const habitData = await axios.get('/api/habit/1');
      const userData = await axios.get('/api/user?userId=1');
      const factData = await axios.get(
        `/api/user/fact?factId=${habitData.data.quitLength.days}`
      );

      // call the setters on the state variables
      changeUser(userData.data);
      changeHabit(habitData.data);
      setFact(factData.data);
    };
    // Invoke the function. This is not semantaclly names=d
    getHabit().catch((err) => console.log(err));
  }, []);

  return (
    <div className={`profile`}>
      <CheckIn seen={popup} set={handlePopupClick}/>
      <InformationHeader userBadge={'Novice'} user={fakeUser} habit={habit}/>
      <div className="infoBody">
<<<<<<< HEAD
        <ChallengeContainer habit={habit} fact={fact} /> <RightInfoBody />
=======
>>>>>>> 2c3cf32 (front-end work)
      </div>
    </div>
     
  );
};

export default Profile;
