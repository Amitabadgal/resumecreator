import axios from './axios';

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to login a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
