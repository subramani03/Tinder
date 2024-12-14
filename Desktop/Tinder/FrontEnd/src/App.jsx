import React from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Feed from './Components/Feed';

const App = () => {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/feed' element={<Feed/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
