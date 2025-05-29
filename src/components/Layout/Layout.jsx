// src/components/Layout/Layout.jsx

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Header.jsx";
import "./Layout.css";

const Layout = ({ darkMode, toggleTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [notificationDropdown, setNotificationDropdown] = useState(false);
   

  // Inside Layout component
useEffect(() => {
  const handleGlobalClick = () => {
    // Close all dropdowns
    if (profileDropdown) setProfileDropdown(false);
    if (notificationDropdown) setNotificationDropdown(false);
  };

  document.addEventListener('click', handleGlobalClick);
  return () => document.removeEventListener('click', handleGlobalClick);
}, [profileDropdown, notificationDropdown]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

 
  return (
    <div className={`layout-root ${darkMode ? "dark" : "light"}`}>
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        collapsed={!isMobile && sidebarCollapsed}
        darkMode={darkMode}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={`main-wrapper ${!isMobile && sidebarCollapsed ? "collapsed" : "expanded"}`}>
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          isMobile={isMobile}
          sidebarCollapsed={!isMobile && sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <main className="main-content">
          <div className="content-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default Layout;