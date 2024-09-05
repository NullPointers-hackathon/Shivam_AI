// src/FacebookLoginButton.js
import React from "react";
import { FacebookAuth } from "../../../firebase";
import "./facebook.css";
import { useNavigate } from "react-router-dom";
import facebook from "../../../assets/images/facebook2.png";

const FacebookButton = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { user, accessToken, errorCode, errorMessage } =
        await FacebookAuth();
      if (user) {
        console.log("User details:", user);
        navigate("/");
      } else if (errorCode) {
        console.error("Error during Facebook login:", errorCode, errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error during Facebook login:", error);
    }
  };

  return (
    <button onClick={handleLogin} className="facebook-login-button">
      <img src={facebook} alt="" className="facebook-auth-icon" />
      <h1 className="signup-login-text">Signup</h1>
    </button>
  );
};

export default FacebookButton;
