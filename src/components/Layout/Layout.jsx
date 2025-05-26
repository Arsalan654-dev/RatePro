// src/components/Layout/Layout.jsx
"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.jsx"
import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"
import "./Layout.css"

const Layout = ({ darkMode, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarCollapsed(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Sidebar
        mobileOpen={mobileOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setMobileOpen(false)}
        darkMode={darkMode}
      />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Header
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
          sidebarCollapsed={sidebarCollapsed}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout