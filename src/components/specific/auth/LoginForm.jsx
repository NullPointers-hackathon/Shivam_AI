// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import "./signupForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../../redux/slices/authSlice";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      dispatch(loginSuccess({
        uid: user.uid,
        username: user.displayName,
        email: user.email
      }));
      toast.success("User successfully logged in");
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message);
      toast.error("Failed to log in");
    }
  };
  

  return (
    <div className="LoginForm">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Login" className="form-control-input"/>
        <div className="Signup-divider">or continue with</div>
        <div className="google-button-login"><FacebookButton /></div>
        <div className="facebook-button-login"><GoogleButton /></div>
      </form>
    </div>
  );
};

export default LoginForm;