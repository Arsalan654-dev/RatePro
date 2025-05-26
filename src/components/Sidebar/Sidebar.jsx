"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  MdDashboard,
  MdAssignment,
  MdAddCircleOutline,
  MdPeople,
  MdInsertChart,
  MdHeadsetMic,
  MdSettings,
  MdClose,
  MdWeb,
  MdExpandMore,
  MdExpandLess,
  MdIntegrationInstructions,
  MdAttachMoney,
  MdContactMail,
  MdComment,
  MdStar,
  MdWidgets,
  MdImage,
  MdOutlineDashboardCustomize
} from "react-icons/md"
import "./Sidebar.css"

const Sidebar = ({ collapsed, mobileOpen, onClose, darkMode }) => {
  const [contentSubmenuOpen, setContentSubmenuOpen] = useState(false)

  const toggleContentSubmenu = (e) => {
    e.preventDefault()
    setContentSubmenuOpen(!contentSubmenuOpen)
  }

  const navItems = [
    { path: "/", name: "Dashboard", icon: <MdDashboard /> },
    { path: "/surveys", name: "Surveys", icon: <MdAssignment /> },
    { path: "/surveys/create", name: "Create Survey", icon: <MdAddCircleOutline /> },
    { path: "/templates", name: "Templates", icon: <MdOutlineDashboardCustomize /> }, // Fixed this line
    { path: "/audiences", name: "Audiences", icon: <MdPeople /> },
    { path: "/analytics", name: "Analytics", icon: <MdInsertChart /> },
    {
      name: "Content Management",
      icon: <MdWeb />,
      submenu: true,
      submenuItems: [
        { path: "/content/integrations", name: "Integrations", icon: <MdIntegrationInstructions /> },
        { path: "/content/pricing", name: "Pricing", icon: <MdAttachMoney /> },
        { path: "/content/contact", name: "Contact Us", icon: <MdContactMail /> },
        { path: "/content/testimonials", name: "Testimonials", icon: <MdComment /> },
        { path: "/content/reviews", name: "Reviews", icon: <MdStar /> },
        { path: "/content/widgets", name: "Widgets", icon: <MdWidgets /> },
        { path: "/content/website", name: "Website Content", icon: <MdImage /> },
      ],
    },
    { path: "/support", name: "Support", icon: <MdHeadsetMic /> },
    { path: "/settings", name: "Settings", icon: <MdSettings /> },
  ]

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""} ${darkMode ? "dark" : "light"}`}>
      <button className="sidebar-toggle" onClick={onClose}>
        <MdClose />
      </button>
     
      <div className="logo-container">
        {collapsed ? <div className="logo-icon">RP</div> : <h1 className="logo-text">Rate Pro</h1>}
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
                  </a>
                  {contentSubmenuOpen && !collapsed && (
                    <ul className="submenu">
                      {item.submenuItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink to={subItem.path} className={({ isActive }) => (isActive ? "active-page" : "")}>
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
                  className={({ isActive }) => (isActive ? "active-page" : "")}
                  end={item.path === "/"}
                >
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="text">{item.name}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar


