// components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Home
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/register"
              className="text-white hover:text-gray-300  transition duration-300"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
