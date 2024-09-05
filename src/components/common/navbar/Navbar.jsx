import React from "react";
import "./style.css";
import Shivam_logo from "../../../assets/images/Shivam_Logo.png";
import { IoCodeSharp } from "react-icons/io5";
import { SiSololearn } from "react-icons/si";
import { FaPen } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../specific/auth/LogoutButton";

const Navbar = () => {
  const navItems = [
    { label: "BuzzWrite", icon: <FaPen />, route: "/BuzzWrite" },
    {
      label: "StudyPods",
      icon: <SiSololearn />,
      route: "/study-pods",
    },
    { label: "Code-Editor", icon: <IoCodeSharp />, route: "/solution-page" },
    {
      label: "Speech-Analyser",
      icon: <IoAnalyticsSharp />,
      route: "/speech-analyzer",
    },
    {
      label: "Feedback",
      icon: <VscFeedback />,
      route: "/feedback",
    },
  ];
  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={Shivam_logo} alt="Logo" className="navbar-logo-image" />
        <div className="navbar-logo">SHIVAM</div>
      </div>
      <div className="navbar-search-box">
        <input type="text" placeholder="Search....." />
      </div>

      <div className="sidebar-nav-items">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? "active" : ""}`
            }
          >
            <i className="sidebar-fas">{item.icon}</i>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar-nav-item">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
