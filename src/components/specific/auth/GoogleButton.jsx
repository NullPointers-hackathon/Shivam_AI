// src/GoogleButton.js
import React from 'react';
import { GoogleAuth } from '../../../firebase';
import './google.css';
import google from "../../../assets/images/google2.png"
import { FaGoogle } from "react-icons/fa";

const GoogleButton = () => {
  const handleLogin = async () => {
    try {
      const { user, accessToken, errorCode, errorMessage } = await GoogleAuth();
      if (user) {
        console.log('User details:', user);
      } else if (errorCode) {
        console.error('Error during Google login:', errorCode, errorMessage);
        // Display error message to user if needed
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error during Google login:', error);
    }
  };

  return (
    <button onClick={handleLogin} className="google-login-button">
      <img src={google} alt="" className='google-auth-icon' /><h1 className='signup-login-text'>Log in</h1>
    </button>
  );
};

export default GoogleButton;
