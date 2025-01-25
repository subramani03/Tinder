import React, { useState, useEffect, useRef } from 'react';
import profile_icon from "../Assets/profile_icon.jpg";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../Utils/UserSlice';
import { BASE_URL } from '../Utils/Constants';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themes = ["light", "dark", "night"]; // DaisyUI themes
  const [currentTheme, setCurrentTheme] = useState();
  const [themeDropdownVisible, setThemeDropdownVisible] = useState(false);

  const themeDropdownRef = useRef(null);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    setThemeDropdownVisible(false); // Close the dropdown after selection
  };

  const toggleThemeDropdown = () => {
    setThemeDropdownVisible((prev) => !prev);
  };

  const logoutHandler = async () => {
    const res = await axios.post(BASE_URL + 'logout', {}, {
      withCredentials: true,
    });
    console.log(res);
    dispatch(removeUser());
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownVisible(false); // Close the dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="navbar bg-base-300 p-3">
        {/* Navbar Brand */}
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost text-2xl text-primary">Tinder</Link>
        </div>

        {/* User Section */}
        {user && (
          <div className="flex items-center">
            <p className="font-semibold text-sm hidden xs:block md:text-base lg:text-xl">{user.firstName}</p>

            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end ml-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.imageUrl || profile_icon}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
              >
                <li>
                  <Link to={'/profile'} > Profile </Link>
                </li>
                <li>
                  <Link to={'/connection'}>Connections</Link>
                </li>
                <li>
                  <Link to={'/request'}>Connection Request</Link>
                </li>
                <li onClick={logoutHandler}>
                  <a>Logout</a>
                </li>

                {/* Theme Dropdown */}
                <li className="relative" ref={themeDropdownRef}>
                  <p
                    onClick={toggleThemeDropdown}
                    className="w-full text-left"
                  >
                    Themes
                  </p>
                  {themeDropdownVisible && (
                    <ul className="absolute bg-base-100 rounded-box w-full mt-2 p-2 shadow-xl z-[2] top-5 right-10">
                      {themes.map((theme) => (
                        <li key={theme}>
                          <button
                            className={`w-full ${
                              currentTheme === theme ? 'font-bold' : ''
                            }`}
                            onClick={() => handleThemeChange(theme)}
                          >
                            {theme}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
