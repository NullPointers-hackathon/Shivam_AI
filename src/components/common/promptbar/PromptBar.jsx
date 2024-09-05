import React from 'react';
import './style.css'; 

const PromptBar = () => {
  return (
    <div className="prompt-bar">
      <input 
        type="text" 
        placeholder="Let the magic begin, Ask a question" 
        className="prompt-input"
      />
      <button className="prompt-button">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
}

export default PromptBar;
