import React from "react";
import "./LandingAbout.css";
import Visual from "../../../../assets/images/Visual.png";
import Visual2 from "../../../../assets/images/Visual(1).png";

export default function LandingAbout() {
  return (
    <div className="landing-about-section">
      <h1>
        Leverage the power of AI to make <br /> educational content creation
        intuitive <br />
        and effective for educators at all levels.
      </h1>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div className="landing-about-1-left">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={Visual} alt="Visual" />
          </div>
          <p>Learn Objective Setting</p>
          <p>
            Helps you set and achieve educational goals with guided assistance.
          </p>
        </div>
        <div className="landing-about-1-right">
          <p>Intuitive Dashboard</p>
          <p>
            Create and manage educational content effortlessly with a single
            click.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "4rem" }}>
        <div className="landing-about-2-right" style={{ marginRight: "2rem" }}>
          <p>Visual Reports</p>
          <p>
            Gain clear insights into your educational content's effectiveness.
          </p>
        </div>
        <div className="landing-about-2-left" style={{ marginRight: "0" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={Visual2} alt="Visual" />
          </div>
          <p>Smart Topic Generator</p>
          <p>
            Automatically suggests relevant topics and key concepts to focus on.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
