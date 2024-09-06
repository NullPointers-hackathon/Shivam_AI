import React, { useState, useEffect } from "react";
import "./style.css";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaPauseCircle, FaStopCircle } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { useSpeech } from "react-text-to-speech";

const OutputDisplay = ({ userPrompt, promptOutput }) => {
  // Local state for tracking speaking status
  const [localIsSpeaking, setLocalIsSpeaking] = useState(false);

  // Initialize the useSpeech hook
  const {
    start,        // Function to start speech
    stop,         // Function to stop speech
    pause,        // Function to pause speech
    resume,       // Function to resume speech
    isSpeaking,   // Boolean to check if speech is currently happening (from useSpeech)
  } = useSpeech({ text: promptOutput });

  // Update local speaking state when the isSpeaking value from the hook changes
  useEffect(() => {
    setLocalIsSpeaking(isSpeaking);
  }, [isSpeaking]);

  // Handle the start of speech and update the local state manually
  const handleStart = () => {
    start();
    setLocalIsSpeaking(true); // Update local state when speech starts
  };

  return (
    <div className="outputdisplay-app">
      <div className="outputdisplay-output-display">
        
        {/* User Prompt Section */}
        <div className="outputdisplay-section user-prompt">
          <div className="outputdisplay-header">
            <span className="outputdisplay-icon">📝</span> 
            <h2 className="outputdisplay-h2">User Prompt</h2>
          </div>
          <div className="outputdisplay-content">
            <p className="outputdisplay-para">{userPrompt}</p>
          </div>
        </div>

        {/* Generated Output Section */}
        <div className="outputdisplay-section generated-output">
          <div className="outputdisplay-header">
            <span className="outputdisplay-icon">🤖</span> 
            <h2 className="outputdisplay-h2">Generated Output</h2>
          </div>
          <div className="outputdisplay-content">
            <p className="outputdisplay-para">{promptOutput}</p>
            
            {/* Conditional Rendering */}
            {!localIsSpeaking ? (
              <div className="outputdisplay-speaker">
                <HiMiniSpeakerWave 
                  onClick={handleStart} // Start speech when the icon is clicked
                  style={{ cursor: "pointer" }}
                />
              </div>
            ) : (
              <div className="outputdisplay-control-button">
  <button onClick={pause} className="outputdisplay-speech-controls" aria-label="Pause speech">
    <FaPauseCircle />
  </button>
  <button onClick={resume} className="outputdisplay-speech-controls" aria-label="Resume speech">
    <GrResume />
  </button>
  <button onClick={() => { stop(); setLocalIsSpeaking(false); }} className="outputdisplay-speech-controls" aria-label="Stop speech">
    <FaStopCircle />
  </button>
</div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
