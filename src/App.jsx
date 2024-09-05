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
import SolutionPage from "../src/components/specific/codeEditor/problemComponent/SolutionPage";
import StudyPods from "./pages/studyPods/StudyPods";
import StudyPodsView from "./pages/studyPodsView/StudyPodsView";
import FeedBack from "./pages/feedback/FeedBack";
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
              <Route path="/peer-connect" element={<PeerConnect />} />
              <Route path="/peer-connect" element={<PeerConnect />}></Route>
              <Route path="/buzzwrite" element={<BuzzWrite />} />
              <Route path="/feedback" element={<FeedBack />} />
            </Route>

            {/* Route with ChakraProvider */}
            <Route
              path="/solution-page"
              element={
                <ChakraProvider theme={Theme}>
                  <SolutionPage />
                </ChakraProvider>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
