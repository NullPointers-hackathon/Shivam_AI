import React, { useState, useEffect } from "react";
import ExampleSection from "../../components/common/examplesection/ExampleSection";
import PromptBar from "../../components/common/promptbar/PromptBar";
import "./BuzzWrite.css";
import Header from "../../components/common/header/Header";
import { setTitle } from "../../redux/slices/titleSlice";
import { useDispatch } from "react-redux";
import OutputDisplay from "../../components/common/outputdisplay/OutputDisplay";

const BuzzWrite = () => {
  const dispatch = useDispatch();
  const [showOutput, setShowOutput] = useState(false);
  const [outputData, setOutputData] = useState({
    userPrompt: "",
    promptOutput: "",
  });
  const [inputValue, setInputValue] = useState(""); // State for the input value

  useEffect(() => {
    dispatch(setTitle("BuzzWriter"));
  }, [dispatch]);

  const handleResponseGenerated = (userText, generatedText) => {
    setOutputData({
      userPrompt: userText,
      promptOutput: generatedText,
    });
    setShowOutput(true);
  };

  const handleExampleClick = (example) => {
    setInputValue(example); // Set the input value when an example is clicked
  };

  return (
    <div className="buzzwrite-main-container">
      <Header />
      <div className="buzzwrite-inner-container">
        <div className="buzzwrite-example-section">
          {showOutput ? (
            <OutputDisplay
              userPrompt={outputData.userPrompt}
              promptOutput={outputData.promptOutput}
            />
          ) : (
            <ExampleSection onExampleClick={handleExampleClick} /> // Pass function as prop
          )}
        </div>

        <div className="buzzwrite-promptbar">
          <PromptBar
            onResponseGenerated={handleResponseGenerated}
            inputValue={inputValue} // Pass the input value to PromptBar
            setInputValue={setInputValue} // Pass setter function to PromptBar
          />
        </div>
      </div>
    </div>
  );
};

export default BuzzWrite;
