import React from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { Provider } from 'react-redux';
import appStore from './Utils/appStore';
import Feed from './Components/Feed';
import EditProfile from './Components/EditProfile';
import Connection from './Components/Connection';
import Request from './Components/Request';

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          {/* Layout Route */}
          <Route path="/" element={<Body />}>
            {/* Nested Routes */}
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />}/>
            <Route path="profiledit" element={<EditProfile/>} />
            <Route path="connection" element={<Connection/>} />
            <Route path="request" element={<Request/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
