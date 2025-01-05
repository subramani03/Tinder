import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';

const Profile = () => {

  const user = useSelector((store) => store.userReducer);
  return (<>
    {
      user && (
        <div>
          <UserCard user={user} />
        </div>
      )
    }   
  </>)
}

export default Profile
