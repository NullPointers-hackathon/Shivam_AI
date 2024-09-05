import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <div
        className="layout-main-container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {/* Left section - could be a sidebar or static content */}
        <div
          className="layout-left-container"
          style={{ width: "20%", margin: "0", padding: "1rem" }}
        >
          <Navbar />
        </div>

        <div
          className="layout-right-container"
          style={{
            width: "80%",
            padding: "1rem",
            backgroundColor: "#131314",
            border: "10px solid #000",
            borderRadius: "2rem",
          }}
        >
          <Outlet /> {/* Renders dynamic route components */}
        </div>
      </div>
    </>
  );
};

export default Layout;
