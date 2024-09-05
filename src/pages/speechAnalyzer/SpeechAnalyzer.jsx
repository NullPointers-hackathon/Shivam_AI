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
  const recognizerRef = useRef(null); // Use useRef to hold the recognizer instance
  const [isRecognizing, setIsRecognizing] = useState(false); // To track if recognition is ongoing

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

    if (!SpeechRecognition) {
      setStatus("Speech recognition is not supported in this browser.");
      return;
    }

    if (recognizerRef.current) {
      recognizerRef.current.stop(); // Stop any previous recognition if active
    }

    const recognizer = new SpeechRecognition();
    recognizerRef.current = recognizer; // Save recognizer instance

    recognizer.continuous = true;
    recognizer.interimResults = false; // Set to false if you don't handle interim results
    recognizer.lang = language;

    recognizer.onstart = () => {
      setIsRecognizing(true);
      setStatus(`Listening in ${language}...`);
      setShowResult(false);
    };

    recognizer.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setStatus("Speech recognition complete.");
      setShowResult(true);

      const originalParagraph = inputParagraphs[language];
      const similarity = calculateWordSimilarity(originalParagraph, transcript);

      if (similarity >= 0.7) {
        setPronunciation(
          `Excellent Pronunciation! Similarity: ${similarity.toFixed(2)}`
        );
      } else if (similarity >= 0.5) {
        setPronunciation(
          `Good Pronunciation. Similarity: ${similarity.toFixed(2)}`
        );
      } else {
        setPronunciation(
          `Needs Improvement. Similarity: ${similarity.toFixed(2)}`
        );
      }
    };

    recognizer.onerror = (event) => {
      setStatus("Speech recognition error: " + event.error);
      setIsRecognizing(false);
    };

    recognizer.onend = () => {
      if (isRecognizing) {
        setStatus("Restarting speech recognition...");
        recognizer.start();
      } else {
        setStatus("Speech recognition stopped. Click 'Record' to start again.");
      }
    };

    recognizer.start();
  };

  const handleStopButtonClick = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
      setStatus("Speech recognition manually stopped.");
      setIsRecognizing(false);
    }
  };

  const calculateWordSimilarity = (str1, str2) => {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));

    const intersection = new Set(
      [...words1].filter((word) => words2.has(word))
    );
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
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
          <button className="speech-analyzer-start-button"
          onClick={handleStartButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
              className="svg-icon"
            >
              <g stroke-width="2" stroke-linecap="round" stroke="#ff342b">
                <rect y="3" x="9" width="6" rx="3" height="11"></rect>
                <path d="m12 18v3"></path>
                <path d="m8 21h8"></path>
                <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path>
              </g>
            </svg>
            <span className="speech-analyzer-lable">Record</span>
          </button>
          <button
            className="speech-analyzer-stop-button"
            onClick={handleStopButtonClick}
          >
            Stop
          </button>
        </div>
        <p>{status}</p>
        {showResult && (
          <div className="speech-analyzer-result">
            <h2>Analysis Result:</h2>
            <p className="speech-analyzer-pronounciation">
              {pronunciation} Excellent Pronunciation! Similarity:
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechAnalyzer;
