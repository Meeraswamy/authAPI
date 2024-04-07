// components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ authUser }) => {
  return (
    <div className="container mx-auto max-w-2xl py-8 mt-8 bg-gray-900 text-white">
      <div className="shadow-lg rounded-lg px-6 py-8 text-center">
        {authUser ? (
          <>
            <h2 className="text-4xl font-bold mb-6">Welcome, {authUser.username}!</h2>
            <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Go to Dashboard</Link>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-6">Welcome, Stranger!</h2>
            <p className="text-lg leading-relaxed">Please Register or Login to continue</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
