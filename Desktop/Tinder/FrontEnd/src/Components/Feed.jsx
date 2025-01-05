import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../Utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Utils/FeedSlice';


const Feed = () => {

  const Feed = useSelector((store)=>store.feedReducer);
  const dispatch = useDispatch();

  let FetchFeed = async () => {
    let res = await axios.get(BASE_URL + 'feed', {
      withCredentials: true,
    })
    dispatch(addFeed(res.data.feed));
  }

  useEffect(() => {
    if (!Feed) {
      FetchFeed();
    }
  }, [])

  return (
    <div>
      {Feed &&

        (<UserCard feed={Feed[0]} />)
      }
    </div>
  )
}

export default Feed
