import React from "react";
import "./LandingNavbar.css";
import ShivamLogo from "../../../assets/images/Shivam_Logo.png";

export default function LandingNavbar() {
  return (
    <div>
      <div className="landing-navbar-logo-section">
        <img src={ShivamLogo} alt="Shivam_Logo" />
        <div className="landing-navbar-logo-section-name">
          <h1>SHIVAM</h1>
          <h6>Smart Human-Intelligent Virtual Assistant for Mentorship</h6>
        </div>
      </div>
    </div>
  );
}
