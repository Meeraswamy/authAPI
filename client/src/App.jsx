// App.jsx

import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  const [authUser, setAuthUser] = useState(null);
  
  // to check if user has already logged in.
  useEffect(()=>{
    try {
      const sessionCookieExists = document.cookie.split(';').some(cookie => cookie.trim().startsWith('session='));
      if(sessionCookieExists){
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          setAuthUser(JSON.parse(storedUser));
      }
    }     
  } catch (error) {
      console.error('Error checking authentication:', error);
  }
  },[])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home authUser={authUser}/>} />
          <Route path="/register" element={authUser? (<Navigate to='/dashboard' />): (<Register setAuthUser={setAuthUser} />)} />
          <Route path="/login" element={authUser? (<Navigate to='/dashboard' />): (<Login setAuthUser={setAuthUser} />)} />
          <Route path="/dashboard" element={authUser? (<Dashboard setAuthUser={setAuthUser} authUser={authUser} />) : (<Navigate to="/login" />) }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
