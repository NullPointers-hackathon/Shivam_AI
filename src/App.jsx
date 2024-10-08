import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Signup from "./pages/signup/Signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/login/Login";
import PeerConnect from "./pages/peerConnect/PeerConnect";
import Layout from "./pages/layout/Layout";
import BuzzWrite from "./pages/buzzWrite/BuzzWrite";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./Theme";
// import SolutionPage from "./pages/problemComponent/SolutionPage";
import StudyPods from "./pages/studyPods/StudyPods";
import StudyPodsView from "./pages/studyPodsView/StudyPodsView";
import SpeechAnalyzer from "./pages/speechAnalyzer/SpeechAnalyzer";
import FeedBack from "./pages/feedback/FeedBack";
import SolutionPage from "./components/specific/codeEditor/problemComponent/SolutionPage";
import { Toaster } from "react-hot-toast";
import CreatePod from "./components/specific/peerConnect/createPod/CreatePod";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* Routes without ChakraProvider */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/buzzwrite" element={<BuzzWrite />} />
              <Route path="/study-pods" element={<StudyPods />}></Route>
              <Route
                path="/study-pods/:podId"
                element={<StudyPodsView />}
              ></Route>
              <Route path="/create-pod" element={<CreatePod />} />
              <Route path="/peer-connect" element={<PeerConnect />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/speech-analyzer" element={<SpeechAnalyzer />} />
              <Route path="/solution-page" element={<SolutionPage />} />
            </Route>

            {/* Route with ChakraProvider */}
          </Routes>
          <Toaster/>
        </Router>
      </Provider>
    </>
  );
}
