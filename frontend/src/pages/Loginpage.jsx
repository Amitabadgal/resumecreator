import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


const appStyle = {
  position: 'fixed', // Fixed position to keep the container in place
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  margin: 0,
  padding: 0,
  overflow: 'hidden', // Prevent scrolling
  background: 'linear-gradient(to bottom right, #80c8ed, #d5e1e8)',
};


const Loginpage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, userId } = responseData;

        // Store the token and userId in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
       
        alert('Login successful');
        setIsLoggedIn(true);
        console.log(responseData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        console.log('Error:', errorData.message);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    return <Dashboard username={formData.username} />;
  }

  return (
    <div style={appStyle}>
    <Header />
   
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-blue-50 shadow-lg rounded-lg max-w-md mx-auto mt-32">
      <h2 className="text-2xl font-bold text-center text-blue-500">Login</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </form>
    <div style={{ textAlign: 'center' }}>
    <h3>Don't have an account?<Link to="/registration" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>
            Signup
          </Link></h3>
    </div>
    </div>
  );
};

export default Loginpage;
