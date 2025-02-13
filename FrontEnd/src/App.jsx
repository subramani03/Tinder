import React, { useEffect } from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import appStore from './Utils/appStore';
import axios from 'axios';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Feed from './Components/Feed';
import EditProfile from './Components/EditProfile';
import Connection from './Components/Connection';
import Request from './Components/Request';
import PrivacyPolicy from './Components/FooterLinks/PrivacyPolicy';
import TermsAndConditions from './Components/FooterLinks/TermsAndConditions';
import CancellationAndRefund from './Components/FooterLinks/CancellationAndRefund';
import ContactUs from './Components/FooterLinks/ContactUs';
import ShippingAndDelivery from './Components/FooterLinks/ShippingAndDelivery';
import Chat from './Components/Chat';
import { BASE_URL } from './Utils/Constants';
import { addUser } from './Utils/UserSlice';

const AppContent = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.authReducer.isloggedIn);
const getCookie = (cookieName) => {
  const cookies = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${cookieName}=`));
  return cookies ? cookies.split('=')[1] : null;
};

// Usage
const myCookie = getCookie('token');
console.log('Cookie Value:', myCookie);
  

  // Fetch user info on app load
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}profile/view`, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
    }
  };


  useEffect(() => {
    fetchUser(); // Fetch user on initial render
  }, []); // Empty dependency array ensures this runs only once

  // Protected route logic
  
  const ProtectedRoute = () => {
      return myCookie ? <Outlet /> : <Navigate to="/login" replace />;    
  };

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="CancellAndRefund" element={<CancellationAndRefund />} />
          <Route path="Contact" element={<ContactUs />} />
          <Route path="ShippingAndDelivery" element={<ShippingAndDelivery />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profiledit" element={<EditProfile />} />
            <Route path="connection" element={<Connection />} />
            <Route path="request" element={<Request />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={appStore}>
    <AppContent />
  </Provider>
);

export default App;



/*

import React, { useEffect, useState } from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { Provider, useDispatch } from 'react-redux';
import appStore from './Utils/appStore';
import Feed from './Components/Feed';
import EditProfile from './Components/EditProfile';
import Connection from './Components/Connection';
import Request from './Components/Request';
import PrivacyPolicy from './Components/FooterLinks/PrivacyPolicy';
import TermsAndConditions from './Components/FooterLinks/TermsAndConditions';
import CancellationAndRefund from './Components/FooterLinks/CancellationAndRefund';
import ContactUs from './Components/FooterLinks/ContactUs';

import axios from 'axios';
import { BASE_URL } from './Utils/Constants';
import { addUser } from './Utils/UserSlice'; // Corrected import path
import ShippingAndDelivery from './Components/FooterLinks/ShippingAndDelivery ';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(${BASE_URL}profile/view, { withCredentials: true });
      dispatch(addUser(res.data));
      console.log(res.data);
      setIsLoggedIn(true);
      console.log(isLoggedIn)
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children || <Outlet />;
  };

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Layout Route /}
          <Route path="/" element={<Body />}>
            {/* Public Routes /}
            <Route path="login" element={<Login />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="CancellAndRefund" element={<CancellationAndRefund />} />
            <Route path="Contact" element={<ContactUs />} />
            <Route path="ShippingAndDelivery" element={<ShippingAndDelivery />} />


            {/* Protected Routes /}
            <Route element={<ProtectedRoute />}>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profiledit" element={<EditProfile />} />
              <Route path="connection" element={<Connection />} />
              <Route path="request" element={<Request />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App; correct the code gor correct routing 




*/ 




// import React from 'react';
// import "./index.css";
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Body from './Components/Body';
// import Login from './Components/Login';
// import Profile from './Components/Profile';
// import { Provider } from 'react-redux';
// import appStore from './Utils/appStore';
// import Feed from './Components/Feed';
// import EditProfile from './Components/EditProfile';
// import Connection from './Components/Connection';
// import Request from './Components/Request';
// import PrivacyPolicy from './Components/FooterLinks/PrivacyPolicy';
// import TermsAndConditions from './Components/FooterLinks/TermsAndConditions';
// import CancellationAndRefund from './Components/FooterLinks/CancellationAndRefund';
// import ContactUs from './Components/FooterLinks/ContactUs';

// const App = () => {
//   return (
//     <Provider store={appStore} >
//       <BrowserRouter basename='/'>
//         <Routes>
//           {/* Layout Route */}
//           <Route path="/" element={<Body />}>
//             {/* Nested Routes */}
//             <Route index element={<Feed />} />
//             <Route path="login" element={<Login />} />
//             <Route path="profile" element={<Profile />}/>
//             <Route path="profiledit" element={<EditProfile/>} />
//             <Route path="connection" element={<Connection/>} />
//             <Route path="request" element={<Request/>} />
//             <Route path="PrivacyPolicy" element={<PrivacyPolicy/>} />
//             <Route path="TermsAndConditions" element={<TermsAndConditions/>} />
//             <Route path="CancellAndRefund" element={<CancellationAndRefund/>} />
//             <Route path="Contact" element={<ContactUs/>} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// export default App;



// import React from 'react';




  
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
