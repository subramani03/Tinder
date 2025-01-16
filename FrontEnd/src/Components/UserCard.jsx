import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../Utils/FeedSlice';

const UserCard = ({ feed, user }) => {
    const dispatch = useDispatch();
    let HandleIngore = async (status,_id)=>{
        try{
            await axios.post(`${BASE_URL}request/send/${status}/${_id}`,{},{
                withCredentials:true
            });
            dispatch(removeFeed(_id));
        }
        catch(err){
         console.log(err)
        }
    }
    // Check for data availability
    const data = feed || user;
    return data ? (
        <div className="flex justify-center items-center h-5/6 bg-base-100">
            <div className="card card-side bg-base-200 shadow-xl m-10 p-4 gap-4">
                <figure>
                    <img
                        className="w-60 rounded"
                        src={data.imageUrl}
                        alt="User"
                    />
                </figure>
                <div className="card-body flex flex-col gap-2">
                    <h2 className="card-title text-3xl font-bold">
                        {`${data.firstName} ${data.lastName}`}
                    </h2>
                   {data.gender &&( <p>{`Gender: ${data.gender}`}</p>)}
                    {data.age &&( <p>{`Age: ${data.age}`}</p>)}
                    <p>{data.about}</p>
                    {!user && (
                        <div className="card-actions flex justify-between mt-4">
                            <button className="btn btn-primary" onClick={()=>{HandleIngore("ignored",data._id)}}>Ignore</button>
                            <button className="btn btn-secondary"  onClick={()=>{HandleIngore("interested",data._id)}}>Interest</button>
                        </div>
                    )}
                    {
                        user && (
                            <div className='card-actions mt-4'>
                                <button className="btn btn-sm md:btn-md btn-primary"><Link to={'/profiledit'}>Edit profile</Link>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center h-96">
            <h4 className="text-2xl">No feed found, you may have reached the end...</h4>
        </div>
    );
};

export default UserCard;
