import React from 'react';
import './style.css'; 

const ExampleSection = ({ onExampleClick }) => { // Receive function as prop
  const examples = [
    "Explain the basics of photosynthesis for a 10-year-old.",
    "Explain how to multiply fractions in a simple way.",
    "Describe the basic functions of a smartphone.",
    "Write an introduction to artificial intelligence for beginners."
  ];

  return (
    <div className="example-section">
      <h2 className='example-section-header'>Examples</h2>
      <div className="examples-container">
        {examples.map((example, index) => (
          <div
            key={index}
            className="example-box"
            onClick={() => onExampleClick(example)} // Call function on click
          >
            {example}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleSection;
