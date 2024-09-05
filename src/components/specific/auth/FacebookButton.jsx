// src/FacebookLoginButton.js
import React from 'react';
import { FacebookAuth } from '../../../firebase';
import "./facebook.css";
import { useNavigate } from 'react-router-dom';
import facebook from "../../../assets/images/facebook2.png"
import toast from "react-hot-toast";

const FacebookButton = () => {
    const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { user, accessToken, errorCode, errorMessage } = await FacebookAuth();
      if (user) {
        console.log('User details:', user);
        toast('User successfully logged in!',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        navigate("/BuzzWrite");
      } else if (errorCode) {
        console.error('Error during Facebook login:', errorCode, errorMessage);
        toast('Failed to log in!',
          {
            icon: '❌',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
      }
    } catch (error) {
      console.error('Unexpected error during Facebook login:', error);
      toast('Failed to log in!',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }
  };

  return (
    <button onClick={handleLogin} className="facebook-login-button">
      <img src={facebook} alt="" className='facebook-auth-icon' /><h1 className='signup-login-text'>Sign up</h1>
    </button>
  );
};

export default FacebookButton;
