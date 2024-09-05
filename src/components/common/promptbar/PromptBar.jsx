// PromptBar.js
import React, { useState } from "react";
import "./style.css";

const PromptBar = ({ onResponseGenerated }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://172.16.27.210:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });
      if (response.ok) {
        const result = await response.json();
        onResponseGenerated(inputValue,result.generated_text);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="prompt-bar">
      <input
        type="text"
        placeholder="Let the magic begin, Ask a question"
        className="prompt-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="prompt-button" onClick={handleSubmit}>
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
};

export default PromptBar;
