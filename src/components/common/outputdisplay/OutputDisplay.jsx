// OutputDisplay.js
import React from "react";
import "./style.css";

const OutputDisplay = ({ userPrompt, promptOutput }) => {
  return (
    <div className="outputdisplay-app">
      <div className="outputdisplay-output-display">
        <div className="outputdisplay-section user-prompt">
          <div className="outputdisplay-header">
            <span className="outputdisplay-icon">📝</span> 
            <h2 className="outputdisplay-h2">User Prompt</h2>
          </div>
          <div className="outputdisplay-content">
            <p className="outputdisplay-para">{userPrompt}</p>
          </div>
        </div>

        <div className="outputdisplay-section generated-output">
          <div className="outputdisplay-header">
            <span className="outputdisplay-icon">🤖</span> 
            <h2 className="outputdisplay-h2">Generated Output</h2>
          </div>
          <div className="outputdisplay-content">
            <p className="outputdisplay-para">{promptOutput}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
