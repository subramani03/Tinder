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

        // <div className="flex justify-center items-center h-5/6 bg-base-100 ">
        //     <div className="card card-side bg-base-200 shadow-xl  m-10 p-4 gap-4">
        //         <figure className="flex-shrink-0">
        //             <img
        //                 className="w-36 sm:w-40 md:w-55 lg:w-60  xl:w-65 rounded"
        //                 src={data.imageUrl}
        //                 alt="User"
        //             />
        //         </figure>
        //         <div className="card-body flex flex-col text-sm md:text-base">
        //             <h2 className="card-title text-xl md:text-2xl lg:text-3xl font-bold">
        //                 {`${data.firstName} ${data.lastName}`}
        //             </h2>
        //            {data.gender &&( <p>{`Gender: ${data.gender}`}</p>)}
        //             {data.age &&( <p>{`Age: ${data.age}`}</p>)}
        //             <p className='hidden xs:block'>{data.about}</p>
        //             {!user && (
        //                 <div className="card-actions flex justify-between mt-2 text-xs">
        //                     <button className="btn btn-primary btn-sm md:btn-md" onClick={()=>{HandleIngore("ignored",data._id)}}>Ignore</button>
        //                     <button className="btn btn-secondary btn-sm md:btn-md"  onClick={()=>{HandleIngore("interested",data._id)}}>Interest</button>
        //                 </div>
        //             )}
        //             {
        //                 user && (
        //                     <div className='card-actions mt-2 text-xs'>
        //                         <button className="btn btn-sm md:btn-md btn-primary"><Link to={'/profiledit'}>Edit profile</Link>
        //                         </button>
        //                     </div>
        //                 )
        //             }
        //         </div>
        //     </div>
        // </div>

        <div className="flex justify-center items-center h-5/6 bg-base-100">
        <div className="card card-side bg-base-200 shadow-xl m-10 p-4 gap-4 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <figure className="flex-shrink-0">
            <img
              className="w-40 xs:w-32 sm:w-40 md:w-48 lg:w-60 rounded"
              src={data.imageUrl}
              alt="User"
            />
          </figure>
          <div className="card-body flex flex-col text-xs sm:text-sm md:text-base">
            <h2 className="card-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              {`${data.firstName} ${data.lastName}`}
            </h2>
            {data.gender && <p>{`Gender: ${data.gender}`}</p>}
            {data.age && <p>{`Age: ${data.age}`}</p>}
            <p className="hidden xs:block">{data.about}</p>
            {!user && (
              <div className="card-actions flex justify-between mt-2 text-xs sm:text-sm">
                <button
                  className="btn btn-primary btn-xs sm:btn-sm h-8 md:btn-md"
                  onClick={() => {
                    HandleIngore("ignored", data._id);
                  }}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary btn-xs h-8 sm:btn-sm md:btn-md"
                  onClick={() => {
                    HandleIngore("interested", data._id);
                  }}
                >
                  Interest
                </button>
              </div>
            )}
            {user && (
              <div className="card-actions mt-2 text-xs sm:text-sm">
                <button className="btn btn-primary btn-xs h-8 sm:btn-sm md:btn-md">
                  <Link to={"/profiledit"}>Edit profile</Link>
                </button>
              </div>
            )}
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


/*

 <div className="flex justify-center items-center h-5/6 bg-base-100">
        <div className="card card-side bg-base-200 shadow-xl m-10 p-4 gap-4 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <figure className="flex-shrink-0">
            <img
              className="w-40 xs:w-32 sm:w-40 md:w-48 lg:w-60 rounded"
              src={data.imageUrl}
              alt="User"
            />
          </figure>
          <div className="card-body flex flex-col text-xs sm:text-sm md:text-base">
            <h2 className="card-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              {`${data.firstName} ${data.lastName}`}
            </h2>
            {data.gender && <p>{`Gender: ${data.gender}`}</p>}
            {data.age && <p>{`Age: ${data.age}`}</p>}
            <p className="hidden xs:block">{data.about}</p>
            {!user && (
              <div className="card-actions flex justify-between mt-2 text-xs sm:text-sm">
                <button
                  className="btn btn-primary btn-xs sm:btn-sm md:btn-md"
                  onClick={() => {
                    HandleIngore("ignored", data._id);
                  }}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary btn-xs sm:btn-sm md:btn-md"
                  onClick={() => {
                    HandleIngore("interested", data._id);
                  }}
                >
                  Interest
                </button>
              </div>
            )}
            {user && (
              <div className="card-actions mt-2 text-xs sm:text-sm">
                <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md">
                  <Link to={"/profiledit"}>Edit profile</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      

  
*/ 