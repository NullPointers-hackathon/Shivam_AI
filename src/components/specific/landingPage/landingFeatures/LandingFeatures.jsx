import React from "react";
import "./LandingFeatures.css";

export default function LandingFeatures() {
  return (
    <div className="landing-page-features">
      <h1>
        Enhance Your <br /> Content Creation
      </h1>
      <div className="landing-page-features-features-grid">
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-dashboard"></i>
          <h2>Intuitive Dashboard</h2>
          <p>Easily navigate and manage your educational content creation.</p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-optimization"></i>
          <h2>Content Optimization</h2>
          <p>Enhance your educational content with just a single click.</p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-evaluation"></i>
          <h2>Content Evaluation</h2>
          <p>
            Assess the effectiveness of your learning materials effortlessly.
          </p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-visual-reports"></i>
          <h2>Visual Reports</h2>
          <p>Clear insights into the engagement of your learning materials.</p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-visual-insights"></i>
          <h2>Visual Insights</h2>
          <p>
            Understand the performance of resources through easy-to-read visual
            data.
          </p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-objective"></i>
          <h2>Learning Objective Setting</h2>
          <p>Set and achieve educational goals with guided AI assistance.</p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-topic-generator"></i>
          <h2>Smart Topic Generator</h2>
          <p>
            Receive automatic suggestions for relevant topics to enhance your
            content.
          </p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-topic-suggestions"></i>
          <h2>Automatic Topic Suggestions</h2>
          <p>
            Get instant recommendations for topics and concepts to improve your
            content.
          </p>
        </div>
        <div className="landing-page-features-feature">
          <i className="landing-page-features-icon-alerts"></i>
          <h2>Automated Alerts</h2>
          <p>
            Receive notifications on the status of your content, with tips for
            quick improvements.
          </p>
        </div>
      </div>
    </div>
  );
}
