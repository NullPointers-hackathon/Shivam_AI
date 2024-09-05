import React from 'react';
import './style.css'; 

const ExampleSection = () => {
  const examples = [
    "How to connect langchain to search engines with serpapI?",
    "How do I use GPT and wolframAlpha?",
    "How to load and index a pdf",
    "What is AgentExecutor and sequential chain?"
  ];

  return (
    <div className="example-section">
      <h2 className='example-section-header'>Examples</h2>
      <div className="examples-container">
        {examples.map((example, index) => (
          <div key={index} className="example-box">
            {example}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleSection;
