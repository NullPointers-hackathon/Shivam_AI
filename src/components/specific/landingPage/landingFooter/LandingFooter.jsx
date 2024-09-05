import React from "react";
import "./LandingFooter.css";
import ShivamLogo from "../../../../assets/images/Shivam_Logo.png";
export default function LandingFooter() {
  return (
    <div className="landing-footer">
      <div className="landing-footer-1">
        <div className="landing-footer-logo-section">
          <img src={ShivamLogo} alt="Shivam_Logo" />
          <div className="landing-footer-logo-section-name">
            <h1>SHIVAM</h1>
            <h6>
              Smart Human-Intelligent Virtual <br /> Assistant for Mentorship
            </h6>
          </div>
        </div>
      </div>
      <div className="landing-footer-2">
        <h1>Product</h1>
        <h3>Features</h3>
        <h3>Integration</h3>
        <h3>Updates</h3>
        <h3>FAQ</h3>
        <h3>Pricing</h3>
      </div>
      <div className="landing-footer-2">
        <h1>Resources</h1>
        <h3>Examples</h3>
        <h3>Community</h3>
        <h3>Guides</h3>
        <h3>Docs</h3>
        <h3>Press</h3>
      </div>
      <div className="landing-footer-2">
        <h1>Legal</h1>
        <h3>Privacy</h3>
        <h3>Terms</h3>
        <h3>Security</h3>
      </div>
    </div>
  );
}
