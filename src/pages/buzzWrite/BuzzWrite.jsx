// BuzzWrite.js
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

  useEffect(() => {
    dispatch(setTitle("BuzzWriter"));
  }, [dispatch]);

  const handleResponseGenerated = (userText,generatedText) => {
    setOutputData({
      userPrompt: userText, // You might want to pass this dynamically as well
      promptOutput: generatedText,
    });
    setShowOutput(true);
  };

  return (
    <div className="buzzwrite-main-container">
      <Header />
      <div className="buzzwrite-inner-container">
      <div className="buzzwrite-example-section">

        {showOutput ? (
          <>
            <OutputDisplay
              userPrompt={outputData.userPrompt}
              promptOutput={outputData.promptOutput}
            />
          </>
        ) : (
          <>
              <ExampleSection />
          </>
        )}
                    </div>

        <div className="buzzwrite-promptbar">
          <PromptBar onResponseGenerated={handleResponseGenerated} />
        </div>
      </div>
    </div>
  );
};

export default BuzzWrite;
