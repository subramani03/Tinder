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

// Hook for authentication
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}profile/view`, { withCredentials: true });
        dispatch(addUser(res.data));
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { isLoggedIn };
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Layout Route */}
          <Route path="/" element={<Body />}>
            {/* Public Routes */}
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="CancellAndRefund" element={<CancellationAndRefund />} />
            <Route path="Contact" element={<ContactUs />}/>
            <Route path="ShippingAndDelivery" element={<ShippingAndDelivery />} />


            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
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

export default App;





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



