import React from "react";
import SignupForm from "../../components/specific/auth/SignupForm";
import signupImg from "../../assets/images/signup.png";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="Signup-main-container">
      <div className="signup-left-container">
        <img src={signupImg} alt="signup" className="signup-image" />
      </div>
      <div className="signup-right-container">
        <div className="signup-header">
          <h1>Signup for Free</h1>
          <p>
            Already have an account? <a href="/login">Login</a>{" "}
          </p>
        </div>
        <div className="signupForm-container">
            <SignupForm />
        </div>
        </div>
    </div>
  );
};

export default Signup;