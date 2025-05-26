"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext.jsx"
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
  MdAccountCircle,
} from "react-icons/md"
import "./Header.css"

const Header = ({ toggleSidebar, toggleMobileSidebar, sidebarCollapsed, darkMode, toggleTheme }) => {
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [notificationDropdown, setNotificationDropdown] = useState(false)

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className={`header ${darkMode ? "dark" : "light"}`}>
      <div className="header-left">
        <button className="menu-toggle d-none d-lg-flex" onClick={toggleSidebar}>
          <MdMenu />
        </button>
        <button className="menu-toggle d-lg-none" onClick={toggleMobileSidebar}>
          <MdMenu />
        </button>
        <h2 className="page-title">Rate Pro Dashboard</h2>
        <div className="search-container d-none d-lg-block">
          <input type="text" className="search-input" placeholder="Search..." />
          <MdSearch className="search-icon" />
        </div>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <div className="dropdown">
          <button className="notification-btn" onClick={() => setNotificationDropdown(!notificationDropdown)}>
            <MdNotifications />
            <span className="notification-badge">3</span>
          </button>

          {notificationDropdown && (
            <div className="dropdown-menu show">
              <div className="p-3 bg-light dark:bg-dark border-bottom">
                <h6 className="mb-0 font-weight-medium">Notifications</h6>
                <span className="badge badge-primary ml-2">3</span>
              </div>
              <div className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="mr-3 bg-success p-2 rounded-circle">
                    <MdNotifications className="text-white" />
                  </div>
                  <div>
                    <h6 className="mb-0 text-sm">New Response</h6>
                    <p className="mb-0 text-sm text-secondary">You received a new survey response</p>
                  </div>
                  <span className="text-sm text-secondary ml-auto">5 mins ago</span>
                </div>
              </div>
              <div className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="mr-3 bg-primary p-2 rounded-circle">
                    <MdNotifications className="text-white" />
                  </div>
                  <div>
                    <h6 className="mb-0 text-sm">Survey Completed</h6>
                    <p className="mb-0 text-sm text-secondary">Customer satisfaction survey completed</p>
                  </div>
                  <span className="text-sm text-secondary ml-auto">2 hours ago</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="text-center p-2">
                <Link to="/notifications" className="text-primary">
                  See All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div className="user-profile" onClick={() => setProfileDropdown(!profileDropdown)}>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} className="user-avatar" />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light dark:bg-dark rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <MdPerson />
              </div>
            )}
            <span className="user-name d-none d-md-block">{currentUser?.name || "Admin"}</span>
            <MdOutlineArrowDropDown className="d-none d-md-block" />
          </div>

          {profileDropdown && (
            <div className="dropdown-menu show">
              <div className="p-3 bg-light dark:bg-dark border-bottom">
                <h6 className="mb-0">{currentUser?.name || "Admin"}</h6>
                <span className="text-sm text-secondary">{currentUser?.email || "admin@ratepro.com"}</span>
              </div>
              <Link to="/profile" className="dropdown-item">
                <MdAccountCircle className="dropdown-item-icon" />
                Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                <MdSettings className="dropdown-item-icon" />
                Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <MdExitToApp className="dropdown-item-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header




