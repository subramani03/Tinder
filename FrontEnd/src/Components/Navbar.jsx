import React from 'react';
import profile_icon from "../Assets/profile_icon.jpg";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../Utils/UserSlice';
import { BASE_URL } from '../Utils/Constants';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.userReducer);
  console.log(user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();


  let logoutHandler = async () => {
    const res = await axios.post(BASE_URL+'logout',{}, {
      withCredentials: true,
    });
    console.log(res);
    dispatch(removeUser());
    Navigate('/login');
  }

  return (
    <div>
      <div className="navbar bg-base-300 p-3">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost text-2xl text-primary">Tinder</Link>
        </div>
        {
          user && (
            <div className="flex">
              <p className='font-semibold text-sm hidden xs:block md:text-base lg:text-xl'>{user.firstName}</p>
              <div className="dropdown dropdown-end mr-4 ml-1 md:ml-4">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.imageUrl || profile_icon} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl">
                  <li>
                    <Link to={'/profile'} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li><Link to={'/connection'} >Connections</Link></li>
                  <li><Link to={'/request'} >Connection Request</Link></li>
                  <li onClick={() => {
                    logoutHandler()
                  }}><a>Logout</a></li>
                </ul>
              </div>
            </div>

          )
        }

      </div>
    </div>
  )
}

export default Navbar
