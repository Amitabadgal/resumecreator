// src/components/RegistrationForm.jsx
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


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [error, setError] = useState(null); // Track registration errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (formData.password !== formData.confirmpassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful");
        setFormData({ username: "", email: "", password: "", confirmpassword: "" });
        setIsRegistered(true); // Set registration status after successful response
        console.log(responseData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
        console.log("Error:", errorData.message);
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      console.error("Error:", error);
    }
  };

  if (isRegistered) {
    // If registered, render Dashboard component
    return <Dashboard username={formData.username} />;
  }

  // Render registration form
  return (
    <div style={appStyle}>
    <Header />
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-blue-50 shadow-lg rounded-lg max-w-md mx-auto mt-24">
      <h2 className="text-2xl font-bold text-center text-blue-500">Register</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
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
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={formData.confirmpassword}
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
          Register
        </button>
      </div>
    </form>
    <div style={{ textAlign: 'center' }}>
    <h3>Already have an account?<Link to="/login" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>
            Login
          </Link></h3>
    </div>
    </div>
  );
};

export default RegistrationForm;
