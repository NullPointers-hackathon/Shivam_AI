import React from "react";
import "./LandingPage.css";
import LandingNavbar from "../../components/specific/landingPage/landingNavbar/LandingNavbar";
import LandingHome from "../../components/specific/landingPage/landingHome/LandingHome";
import LandingAbout from "../../components/specific/landingPage/landingAbout/LandingAbout";
import LandingFeatures from "../../components/specific/landingPage/landingFeatures/LandingFeatures";
import LandingEmail from "../../components/specific/landingPage/landingEmail/LandingEmail";
import LandingFooter from "../../components/specific/landingPage/landingFooter/LandingFooter";

export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />

      <section id="Landing-Home">
        <LandingHome />
      </section>

      <section id="Landing-About">
        <LandingAbout />
      </section>

      <section id="Landing-Features">
        <LandingFeatures />
      </section>

      <section id="Landing-Email">
        <LandingEmail />
      </section>

      <LandingFooter />
    </div>
  );
}
