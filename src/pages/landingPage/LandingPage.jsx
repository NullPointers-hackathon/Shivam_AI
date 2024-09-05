import React from "react";
import "./LandingPage.css";
import LandingNavbar from "../../components/specific/landingPage/landingNavbar/LandingNavbar";
import LandingHome from "../../components/specific/landingPage/landingHome/LandingHome";
import LandingAbout from "../../components/specific/landingPage/landingAbout/LandingAbout";
export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <LandingHome />
      <LandingAbout />
    </div>
  );
}
