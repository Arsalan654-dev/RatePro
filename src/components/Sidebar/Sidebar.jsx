// src\components\Sidebar\Sidebar.jsx

"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import {
  MdDashboard, MdAssignment, MdAddCircleOutline, MdPeople, MdInsertChart,
  MdHeadsetMic, MdSettings, MdWeb, MdExpandMore, MdExpandLess,
  MdIntegrationInstructions, MdAttachMoney, MdContactMail, MdComment, MdStar,
  MdWidgets, MdImage, MdOutlineDashboardCustomize, MdMenu, MdClose
} from "react-icons/md"
import "./Sidebar.css"

const Sidebar = ({ darkMode, isOpen, isMobile,  onClose }) => {
  const [contentSubmenuOpen, setContentSubmenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const sidebarRef = useRef()

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isMobile) {
          onClose()
        } else if (!collapsed) {
          setCollapsed(true)
        }
      }
    }
  

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobile, onClose, collapsed])

  const toggleContentSubmenu = (e) => {
    e.preventDefault()
    setContentSubmenuOpen(!contentSubmenuOpen)
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const navItems = [
    { path: "/", name: "Dashboard", icon: <MdDashboard /> },
    {
    name: "Survey Management",
    icon: <MdAssignment />,
    submenu: true,
    submenuItems: [
      { path: "/surveys", name: "All Surveys", icon: <MdAssignment /> },
      { path: "/surveys/create", name: "Create Survey", icon: <MdAddCircleOutline /> },
      { path: "/surveys/templates", name: "Templates", icon: <MdOutlineDashboardCustomize /> },
      { path: "/surveys/responses", name: "Responses", icon: <MdPeople /> },
      { path: "/surveys/analytics", name: "Analytics", icon: <MdInsertChart /> }
    ]
  },
    { path: "/templates", name: "Templates", icon: <MdOutlineDashboardCustomize /> },
    { path: "/audiences", name: "Audiences", icon: <MdPeople /> },
    { path: "/users", name: "User Management", icon: <MdPeople /> },
    { path: "/analytics", name: "Analytics", icon: <MdInsertChart /> },
    {
      name: "Content Management", 
      icon: <MdWeb />, 
      submenu: true,
      submenuItems: [
        { path: "/content/integrations", name: "Integrations", icon: <MdIntegrationInstructions /> },
        { path: "/content/testimonials", name: "Testimonials", icon: <MdComment /> },
        { path: "/content/widgets", name: "Widgets", icon: <MdWidgets /> },
      ]
    },
    { path: "/settings", name: "Settings", icon: <MdSettings /> },
  ]

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''} ${darkMode ? 'dark' : 'light'} ${collapsed ? 'collapsed' : ''}`}
      >
        <div className="sidebar-header">
          {!collapsed && <h2>Rate Pro</h2>}
          {isMobile ? (
            <button className="sidebar-close" onClick={onClose}>
              <MdClose />
            </button>
          ) : (
            <button className="sidebar-collapse" onClick={toggleCollapse}>
              {collapsed ? <MdMenu /> : <MdClose />}
            </button>
          )}
        </div>
        
        <div className="nav-menu">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <>
                    <a
                      href="#"
                      className={`submenu-toggle ${contentSubmenuOpen ? "active" : ""}`}
                      onClick={toggleContentSubmenu}
                    >
                      <span className="icon">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="text">{item.name}</span>
                          <span className="submenu-arrow">
                            {contentSubmenuOpen ? <MdExpandLess /> : <MdExpandMore />}
                          </span>
                        </>
                      )}
                      {collapsed && (
                        <span className="tooltip">{item.name}</span>
                      )}
                    </a>
                    {contentSubmenuOpen && !collapsed && (
                      <ul className="submenu">
                        {item.submenuItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink 
                              to={subItem.path} 
                              className={({ isActive }) => isActive ? "active-page" : ""}
                              onClick={() => isMobile && onClose()}
                            >
                              <span className="icon">{subItem.icon}</span>
                              <span className="text">{subItem.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => isActive ? "active-page" : ""}
                    onClick={() => {
                      if (isMobile) onClose()
                      if (collapsed) setCollapsed(false)
                    }}
                  >
                    <span className="icon">{item.icon}</span>
                    {!collapsed && <span className="text">{item.name}</span>}
                    {collapsed && (
                      <span className="tooltip">{item.name}</span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar