// src/GoogleButton.js
import React from "react";
import { GoogleAuth } from "../../../firebase";
import "./google.css";
import google from "../../../assets/images/google2.png";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleButton = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { user, accessToken, errorCode, errorMessage } = await GoogleAuth();
      if (user) {
        console.log("User details:", user);
        toast("User successfully logged in!", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/BuzzWrite");
      } else if (errorCode) {
        console.error("Error during Google login:", errorCode, errorMessage);
        toast("Failed to log in!", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        // Display error message to user if needed
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error during Google login:", error);
      toast("Failed to log in!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <button onClick={handleLogin} className="google-login-button">
      <img src={google} alt="" className="google-auth-icon" />
      <h1 className="google-login-text">Signup</h1>
    </button>
  );
};

export default GoogleButton;
