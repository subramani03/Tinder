import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../Utils/Constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../Utils/UserSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // let fetchUser = async () => {
    //     try {
    //         let res = await axios.get(BASE_URL + "profile/view", {
    //             withCredentials: true,
    //         });
    //         dispatch(addUser(res.data));
    //     }
    //     catch (err) {
    //         if (err.status === 401) {
    //             navigate('/login');
    //         }
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     fetchUser();
    // }, []);
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body
