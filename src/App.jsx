import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import OutputDisplay from "./components/common/outputdisplay/OutputDisplay";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/OutputDisplay" element={<OutputDisplay />} />
        </Routes>
      </Router>
    </>
  );
}
