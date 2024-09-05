import React from "react";
import "./LandingNavbar.css";
import ShivamLogo from "../../../../assets/images/Shivam_Logo.png";

export default function LandingNavbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "5rem",
        paddingTop: "0.5rem",
        paddingRight: "5rem",
        borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
        paddingBottom: "1.5rem",
      }}
    >
      {/* 1st section */}
      <div className="landing-navbar-logo-section">
        <img src={ShivamLogo} alt="Shivam_Logo" />
        <div className="landing-navbar-logo-section-name">
          <h1>SHIVAM</h1>
          <h6>
            Smart Human-Intelligent Virtual <br /> Assistant for Mentorship
          </h6>
        </div>
      </div>
      {/* 2nd Section  */}
      <div className="landing-navbar-middle-section">
        <h2>Home</h2>
        <h2>About</h2>
        <h2>Features</h2>
        <h2>API</h2>
      </div>
      {/* 3rd Section  */}
      <div className="landing-navbar-join-us-button">
        <button>Join Us</button>
      </div>
    </div>
  );
}
