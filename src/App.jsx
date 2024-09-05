import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Signup from "./pages/signup/Signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/login/Login";
import PeerConnect from "./pages/peerConnect/PeerConnect";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/peer-connect" element={<PeerConnect />}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
