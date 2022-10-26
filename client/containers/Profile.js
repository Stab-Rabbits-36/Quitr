import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InformationHeader from '../components/InformationHeader';
import RightInfoBody from '../components/RightInfoBody';
import LeftInfoBody from './LeftInfoBody';
import '../styles/info.scss';
import CheckIn from '../components/CheckIn';
import ChallengeContainer from './ChallengeContainer'

// This is the main container that will call the backend to pass the result of that information to the child components
const Profile = (props) => {
  const [habit, changeHabit] = useState();
  const [fakeUser, changeUser] = useState();
  const [fact, setFact] = useState();
  const [popup, setPopup] = useState(true);

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
      <CheckIn seen={popup} setSeen={setPopup}/>
      <InformationHeader userBadge={'Novice'}user={fakeUser} habit={habit}/>
      <div className="infoBody">
        <ChallengeContainer habit={habit} fact={fact} /> <RightInfoBody />
      </div>
    </div>
     
  );
};

export default Profile;
