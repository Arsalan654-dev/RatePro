"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  MdMenu,
  MdLightMode,
  MdDarkMode,
  MdNotifications,
  MdPerson,
  MdSearch,
  MdOutlineArrowDropDown,
  MdSettings,
  MdExitToApp,
  MdAccountCircle
} from "react-icons/md"
import "./Header.css"

const Header = ({ isMobile, sidebarCollapsed, darkMode, toggleTheme }) => {
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [notificationDropdown, setNotificationDropdown] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  
  const navigate = useNavigate()
  const headerRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setProfileDropdown(false);
        setNotificationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // logout()
    navigate("/login")
  }

  return (
    <header className={`header ${darkMode ? "dark" : "light"}`} ref={headerRef}>
      <div className="header-left">
        
        <h2 className="page-title">Rate Pro Dashboard</h2>
        <div className={`search-container ${searchFocused ? 'focused' : ''} ${isMobile ? 'd-none' : ''}`}>
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..." 
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          data-tooltip={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <div className="dropdown">
          <button 
            className="notification-btn" 
            onClick={() => setNotificationDropdown(!notificationDropdown)}
            aria-label="Notifications"
            data-tooltip="Notifications"
          >
            <MdNotifications />
            <span className="notification-badge">3</span>
          </button>

          {notificationDropdown && (
            <div className="dropdown-menu show">
              <div className="dropdown-header">
                <h6>Notifications</h6>
                <span className="badge">3</span>
              </div>
              <div className="dropdown-item">
                <div className="notification-item">
                  <div className="notification-icon bg-success">
                    <MdNotifications />
                  </div>
                  <div className="notification-content">
                    <h6>New Response</h6>
                    <p>You received a new survey response</p>
                  </div>
                  <span className="notification-time">5 mins ago</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-footer">
                <Link to="/notifications">See All Notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div 
            className="user-profile" 
            onClick={() => setProfileDropdown(!profileDropdown)}
            data-tooltip="Profile"
          >
            <div className="user-avatar">
              <MdPerson />
            </div>
            {!sidebarCollapsed && (
              <>
                <span className="user-name">Admin</span>
                <MdOutlineArrowDropDown />
              </>
            )}
          </div>

          {profileDropdown && (
            <div className="dropdown-menu show">
              <div className="dropdown-header">
                <h6>Admin</h6>
                <span>admin@ratepro.com</span>
              </div>
              <Link to="/profile" className="dropdown-item">
                <MdAccountCircle />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <MdSettings />
                <span>Settings</span>
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <MdExitToApp />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header