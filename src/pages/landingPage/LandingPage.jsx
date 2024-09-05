import React from "react";
import "./LandingPage.css";
import LandingNavbar from "../../components/specific/landingPage/LandingNavbar";
import LogoutButton from "../../components/specific/auth/LogoutButton";
export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <LogoutButton />
    </div>
  );
}
