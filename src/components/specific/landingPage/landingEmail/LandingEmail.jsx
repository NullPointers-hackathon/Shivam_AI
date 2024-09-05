import React from "react";
import "./LandingEmail.css";

export default function LandingEmail() {
  return (
    <div className="landing-email">
      <div className="landing-email-inner">
        <h1>
          AI-Driven Content <br />
          Creation for Everyone.
        </h1>
        <div className="landing-email-signup">
          <input
            type="email"
            placeholder="Your email"
            className="landing-email-input"
          />
          <button className="landing-email-join-button">Join waitlist</button>
        </div>
      </div>
    </div>
  );
}
