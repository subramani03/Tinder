import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../Utils/Constants';
import { addUser } from '../Utils/UserSlice';

const EditProfile = () => {
        const user = useSelector((store) => store.userReducer);
        const [firstNameState, setFirstNameState] = useState(user?.firstName);
        const [lastNameState, setLastNameState] = useState(user?.lastName);
        const [ageState, setAgeState] = useState(user?.age);
        const [genderState, setgenderState] = useState(user?.gender);
        const [aboutState, setAbout] = useState(user?.about);
        const dispatch = useDispatch();
        const [error, setError] = useState(" ");

        useEffect(() => {
            setFirstNameState(user?.firstName || "");
            setLastNameState(user?.lastName || "");
            setAgeState(user?.age || "");
            setgenderState(user?.gender || "Others");
            setAbout(user?.about || "");
        }, [user]);

    const updateUser = async () => {
        try {
            let res = await axios.patch(BASE_URL + "profile/edit", {
                firstName: firstNameState,
                lastName: lastNameState,
                age: ageState,
                gender: genderState,
                about: aboutState,
            },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res.data));
            setError(""); 
            toast.success("Profile updated successfully! ",{ position: "top-left" })
        }
        catch (err) {
            console.log(err);
            setError(err);
            toast.error("Profile not updated , something went wrong! ",{ position: "top-left" })
        }
    }

    return (

        <div className='flex justify-center my-10 p-4'>
              <ToastContainer />
            <div className="card bg-base-200 w-auto shadow-lg ">
                <div className="card-body">
                    <h2 className="card-title text-3xl text-primary">Edit Profile</h2>
                    <div className='flex  gap-2' >
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text">Fisrt Name</span>
                            </div>
                            <input type="text" value={firstNameState} onChange={(e) => {setFirstNameState(e.target.value) }} placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                        </label>

                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" value={lastNameState} onChange={(e) => { setLastNameState(e.target.value) }} placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                        </label>


                    </div>

                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Age</span>
                        </div>
                        <input type="text" value={ageState} onChange={(e) => { setAgeState(e.target.value) }} placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                    </label>


                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Gender</span>
                        </div>
                        <select value={genderState} onChange={(e) => { setgenderState(e.target.value) }} className="select select-bordered w-full max-w-lg">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">About</span>
                        </div>
                        <textarea onChange={(e) => { setAbout(e.target.value) }} value={aboutState} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </label>


                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary w-28" onClick={() => { updateUser() }}>Save profile</button>
                    </div>


                </div>
            </div>

        </div>

    )
}

export default EditProfile
