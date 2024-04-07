// components/Dashboard.jsx

import React from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;   // URL to make API calls

const Dashboard = ({ authUser, setAuthUser }) => {
  const handleLogout = async () => {
    try {
      await axios.get(`${apiUrl}/logout`,{withCredentials:true});
      localStorage.clear(); // Clear user data from local storage
      setAuthUser(null); // Reset authUser state to null after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 mt-8 bg-gray-900 text-white">
      <div className="shadow-lg rounded-lg px-6 py-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>
        <p className="text-lg leading-relaxed">Hello, {authUser.username}! We're glad to see you here.</p>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
