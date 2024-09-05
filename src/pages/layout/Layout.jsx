import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div
        className="layout-main-container"
        style={{ display: "flex", flexDirection: "row", height: "100vh" }}
      >
        {/* Left section - could be a sidebar or static content */}
        <div
          className="layout-left-container"
          style={{ width: "20%", margin: "0", padding: "1rem" }}
        >
          <h2>Left Sidebar Content</h2> {/* Static left content */}
        </div>

        {/* Right section where the dynamic content from Outlet will load */}
        <div
          className="layout-right-container"
          style={{ width: "80%", padding: "1rem" }}
        >
          <Outlet /> {/* Renders dynamic route components */}
        </div>
      </div>
    </>
  );
};

export default Layout;
