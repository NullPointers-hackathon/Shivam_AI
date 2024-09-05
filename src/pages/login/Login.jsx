import React from "react";
import LoginForm from "../../components/specific/auth/LoginForm";
import "./login.css";
import loginImg from "../../assets/images/login.png";

const Login = () => {
  return (
    <div className="Login-main-container">
      <div className="login-left-container">
        <div className="login-header">
          <h1>Login to your account</h1>
          <p>
            Don't have an account? <a href="/signup">SignUp</a>
          </p>
        </div>
        <div className="loginForm-container">
          <LoginForm />
        </div>
      </div>
      <div className="login-right-container">
        <img src={loginImg} alt="login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;