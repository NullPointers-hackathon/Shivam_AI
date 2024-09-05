import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Signup from "./pages/signup/Signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/login/Login";
import PeerConnect from "./pages/peerConnect/PeerConnect";
import Layout from "./pages/layout/Layout";
import BuzzWrite from "./pages/buzzWrite/BuzzWrite";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
            <Route path="/peer-connect" element={<PeerConnect />}></Route>
            <Route path="/buzzwrite" element={<BuzzWrite/>}/>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
