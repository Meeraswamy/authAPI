// components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_SERVER_URL;   // URL to make API calls

const Login = ({setAuthUser}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // to navigate to the dashboard after login
  const [error,setError] = useState(''); // display error

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, formData,{headers:{'Content-Type' : 'application/json'},withCredentials:true});
      localStorage.setItem('authUser',JSON.stringify({username:response.data.username}))
      setAuthUser({ username: response.data.username })
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setFormData({email: '', password: '' });  // reset the form
      if(error.response && error.response.status === 429){
        setError('Too many requests from this IP, please try again later.') 
      }
      else{
        setError(error.response ? error.response.data.message : error.message)
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8 mt-8 bg-gray-900 text-white">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" autoComplete='email' placeholder="Enter your email" onChange={handleChange} value={formData.email || ""} required />
        </div>
        <div className="mb-6">
            <label className="block text-gray-300 font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={formData.password || ""} required />
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
        </div>
    </form>
</div>

  );
};

export default Login;
