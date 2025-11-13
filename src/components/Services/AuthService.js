import axios from 'axios';

// Set up your base API URL. 
// It's better to put this in a .env file, but this is fine for now.
const API_BASE_URL = 'http://localhost:8080/api/auth';

/**
 * Sends a POST request to the /send-otp endpoint.
 * @param {string} email - The user's email address.
 * @returns {Promise<object>} The data from the API response.
 */
const sendOtp = async (email) => {
  try {
    console.log('Sending OTP to email:', email);
    // We send the email in the request body, as expected by most POST APIs
    const response = await axios.post(`${API_BASE_URL}/send-otp`, {
      email: email,
    });
    
    // axios puts the response data in the 'data' property
    return response;
    
  } catch (error) {
  
    console.error('Error sending OTP:', error.success || error.message);
    
    // Re-throw the error so the component can catch it and show a message
    throw new Error(error.message || 'Failed to send OTP. Please try again.');
  }
};

/**
 * Sends a POST request to verify the OTP and log the user in.
 * @param {string} email - The user's email address.
 * @param {string} otp - The one-time password.
 * @returns {Promise<object>} The user data and token from the API response.
 */
const loginWithOtp = async (email, otp) => {
  try {
    console.log('Verifying OTP for email:', email);
    
    // Send both email and OTP to the login endpoint
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      otp: otp,
    });

    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      
    }

    return response;

  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed. Please check your OTP and try again.';
    console.error('Error logging in with OTP:', message);
    
    // Re-throw the error for the component
    throw new Error(message);
  }
};

/**
 * Checks if there is a valid, non-expired token in localStorage.
 * @returns {boolean} True if authenticated, false otherwise.
 */
const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return false;
  }


  return true;
};

/**
 * Removes the access token from localStorage to log the user out.
 */
const logout = () => {
  localStorage.removeItem('accessToken');
  // You might also want to remove user info
  // localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/login'; 
};


const authService = {
  sendOtp,
  loginWithOtp,
  isAuthenticated,
  logout,
};

export default authService;