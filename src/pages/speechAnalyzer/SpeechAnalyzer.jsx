import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/common/header/Header";
import { setTitle } from "../../redux/slices/titleSlice";
import { useDispatch } from "react-redux";
import "./SpeechAnalyzer.css";

const SpeechAnalyzer = () => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("en-US");
  const [status, setStatus] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [pronunciation, setPronunciation] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false); // To track if recognition is ongoing
  const [recognizedText, setRecognizedText] = useState(""); // To store the recognized text
  const [score, setScore] = useState(null); // To store the score
  const recognizerRef = useRef(null); // Use useRef to hold the recognizer instance

  useEffect(() => {
    dispatch(setTitle("Speech Analyzer"));
  }, [dispatch]);

  const inputParagraphs = {
    "en-US":
      "A car has become an essential part of modern life for many people. It provides a convenient and flexible way to travel and can be used for a variety of purposes, such as commuting to work, running errands, and taking road trips.",
    "hi-IN":
      "एक कार कई लोगों के लिए आधुनिक जीवन का एक अनिवार्य हिस्सा बन गई है। यह यात्रा करने के लिए एक सुविधाजनक और लचीला तरीका प्रदान करता है और इसका उपयोग विभिन्न उद्देश्यों के लिए किया जा सकता है, जैसे कि काम पर आना-जाना, काम चलाना और सड़क यात्राएं करना।",
    "te-IN":
      "కారు అనేది చాలా మందికి ఆధునిక జీవితంలో ఒక ముఖ్యమైన భాగంగా మారింది. ఇది ప్రయాణానికి సౌకర్యవంతమైన మరియు సరళమైన మార్గాన్ని అందిస్తుంది మరియు పనికి ప్రయాణించడం, పనులను నడపడం మరియు రోడ్డు ప్రయాణాలు చేయడం వంటి వివిధ ప్రయోజనాల కోసం ఉపయోగించవచ్చు.",
    "Ma-IN":
      "ഒരു കാർ ആധുനിക ജീവിതത്തിന്റെ അവിഭാജ്യ ഘടകമായി മാറിയിരിക്കുന്നു. ഇത് യാത്ര ചെയ്യുന്നതിനുള്ള സൗകര്യപ്രദവും വഴക്കമുള്ളതുമായ മാർഗം നൽകുന്നു, കൂടാതെ ജോലിയിലേക്കുള്ള യാത്ര, ജോലികൾ ചെയ്യുക, റോഡ് യാത്രകൾ നടത്തുക തുടങ്ങിയ വിവിധ ആവശ്യങ്ങൾക്കായി ഇത് ഉപയോഗിക്കാം.",
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleStartButtonClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language; // Set dynamically based on selected language

    recognition.start();
    setIsRecognizing(true);
    setStatus("Listening...");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      evaluatePronunciation(transcript);
      setIsRecognizing(false);
      setStatus("Recognition completed");
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecognizing(false);
      setStatus("Error occurred: " + event.error);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
      setStatus("Recognition ended");
    };

    recognizerRef.current = recognition; // Store the recognizer instance
  };

  // Evaluate pronunciation by comparing the given text with the recognized text
  const evaluatePronunciation = (transcript) => {
    const similarity = compareTexts(inputParagraphs[language], transcript);
    setScore(similarity);
    setShowResult(true);
    setPronunciation(`Your pronunciation is ${similarity}% similar to the given text.`);
  };

  // Simple comparison logic to calculate similarity (0 to 100)
  const compareTexts = (text1, text2) => {
    const words1 = text1.toLowerCase().split(" ");
    const words2 = text2.toLowerCase().split(" ");
    let matches = 0;

    words1.forEach((word, index) => {
      if (words2[index] && words2[index] === word) {
        matches++;
      }
    });

    return Math.round((matches / words1.length) * 100); // Return a percentage score
  };

  return (
    <div className="speech-analyzer-main-container">
      <Header />
      <div className="speech-analyzer-inner-container">
        <div className="speech-analyzer-textarea-container">
          <textarea
            className="speech-analyzer-textarea"
            value={inputParagraphs[language]}
            readOnly
          />
        </div>
        <div className="speech-analyzer-lang-button">
          <div className="speech-analyzer-language-select">
            <p>Select a language:</p>
            <select
              id="languageSelect"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en-US">English (US)</option>
              <option value="te-IN">Telugu (IN)</option>
              <option value="hi-IN">Hindi (IN)</option>
              <option value="Ma-IN">Malayalam (IN)</option>
            </select>
          </div>
          <button
            className="speech-analyzer-start-button"
            onClick={handleStartButtonClick}
            disabled={isRecognizing} // Disable button when recognizing
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
              className="svg-icon"
            >
              <g strokeWidth="2" strokeLinecap="round" stroke="#ff342b">
                <rect y="3" x="9" width="6" rx="3" height="11"></rect>
                <path d="m12 18v3"></path>
                <path d="m8 21h8"></path>
                <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path>
              </g>
            </svg>
            <span className="speech-analyzer-lable">Record</span>
          </button>
        </div>
        <p>{status}</p>
        {showResult && (
          <div className="speech-analyzer-result">
            <h2>Analysis Result:</h2>
            <p className="speech-analyzer-pronounciation">{pronunciation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechAnalyzer;
