import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Utils/Constants'
import { Link } from 'react-router-dom';
const Connection = () => {
    let [connectionState, setconnectionState] = useState([]);
    let [error, setError] = useState(null);
    let Fetchconnection = async () => {
        try {
            let connection = await axios.get(BASE_URL + "user/connection", {
                withCredentials: true,
            })
            console.log(connection.data);
            setconnectionState(connection.data);
        }
        catch (err) {
            if (err.status === 404) {
                setError(err.response.data);
            }
            else{
                setError(err.response.data)
            }
        }

    }
    useEffect(() => {
        Fetchconnection();
    }, [])

    if (!connectionState) {
        return null;
    }
    if (connectionState.length <= 0) {
        return <div className='text-2xl flex justify-center items-center h-96'>No connection found</div>;
    }
    if (error) {
        return <div className='text-2xl flex justify-center items-center h-96'>{error}</div>;
    }
   

    return (<div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl  lg:text-4xl md:text-3xl my-3 font-semibold text-primary'>Connection</h1>
        {
            connectionState.map((connection, index) => {
                let {_id, age, firstName, gender, lastName, about, imageUrl } = connection;
                return (
                    <div key={index} className='flex justify-between px-14 items-center bg-base-300 w-2/3 p-4 rounded-md mb-2'>
                        <div className='flex gap-5 items-center'>
                            <div>
                                <img className='w-28 rounded-full' src={imageUrl} alt={"image"} />
                            </div>
                            <div>
                                <p className='text-base  lg:text-2xl md:text-xl font-bold my-2'>{firstName + " " + lastName}</p>
                                <p className='text-sm  lg:text-base md:text-text-base'>{age + "," + gender}</p>
                                <p className='text-sm  lg:text-base md:text-text-base'>{about}</p>
                            </div>
                        </div>
                        <Link to = {`/chat/${_id}`}>         
                            <button className='bg-primary text-white px-4 py-2 rounded-md'>Chat</button>
                            </Link>
                    </div>

                )
            })

        }


    </div>

    )
}


export default Connection
