import React from "react";
import "./LandingHome.css";
import HomeImage from "../../../../assets/images/Home-Image.png";
export default function LandingHome() {
  return (
    <div className="landing-page-home-section">
      <h1>
        Generate Educational <br />
        <span>Content With AI</span>
      </h1>
      <p>
        Enhance your educational content creation seamlessly with AI, where
        advanced NLP technology meets intuitive tools for generating
        high-quality learning materials.
      </p>
      <button>Start for free</button>
      <img src={HomeImage} alt="Home-Image" />
    </div>
  );
}
