import React from "react";
import "./style.css";

const OutputDisplay = ({ userPrompt, promptOutput }) => {
  return (
    <div className="output-display">
      <div className="section user-prompt">
        <div className="header">
          <span className="icon">📝</span> 
          <h2>User Prompt</h2>
        </div>
        <div className="content">
          <p>{userPrompt}</p>
        </div>
      </div>

      <div className="section generated-output">
        <div className="header">
          <span className="icon">🤖</span> 
          <h2>Generated Output</h2>
        </div>
        <div className="content">
          <p>{promptOutput}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const userPrompt = "How to connect LangChain to search engines with SerpAPI?";
  const promptOutput =
    "To connect LangChain to search engines using SerpAPI, you will need to follow these steps:\n1. Install the required package: google-search-results. You can do this using pip.";

  return (
    <div className="App">
      <OutputDisplay userPrompt={userPrompt} promptOutput={promptOutput} />
    </div>
  );
};

export default App;
