"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx"
import Layout from "./components/Layout/Layout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Surveys from "./pages/Surveys/Surveys.jsx"
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey.jsx"
// import EditSurvey from "./pages/EditSurvey/EditSurvey.jsx"
// import SurveyPreview from "./pages/SurveyPreview/SurveyPreview.jsx"
import Templates from "./pages/Templates/Templates.jsx"
import Audiences from "./pages/Audiences/Audiences.jsx"
import Analytics from "./pages/Analytics/Analytics.jsx"

import Settings from "./pages/Settings/Settings.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"
import ResetPassword from "./pages/Auth/ResetPassword.jsx"
// import TakeSurvey from "./pages/TakeSurvey/TakeSurvey.jsx"
import ThankYou from "./pages/Settings/ThankYouPage.jsx"

import Integrations from "./pages/ContentManagement/Integrations.jsx"
// import Pricing from "./pages/ContentManagement/Pricing.jsx"
// import ContactUs from "./pages/ContentManagement/ContactUs.jsx"
import Testimonials from "./pages/ContentManagement/Testimonials.jsx"
// import Reviews from "./pages/ContentManagement/Reviews.jsx"
import Widgets from "./pages/ContentManagement/Widgets.jsx"
// import WebsiteContent from "./pages/ContentManagement/WebsiteContent.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import "./App.css"


// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [], requiredPermissions = [] }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }

  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every(perm => 
      currentUser.permissions?.[perm]
    )
    if (!hasPermission) {
      return <Navigate to="/" replace />
    }
  }

  return children
}
// Public route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode")
    return 
   
    savedTheme ? JSON.parse(savedTheme) : window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    
    <AuthProvider>
      <Router>
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            {/* Survey taking routes (public) */}
            {/* <Route path="/s/:surveyId" element={<TakeSurvey />} />*/}
            <Route path="/thank-you" element={<ThankYou />} /> 

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
                </PublicRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="surveys" element={<Surveys />} />
              <Route path="surveys/create" element={<CreateSurvey />} />
              {/* <Route path="surveys/edit/:id" element={<EditSurvey />} /> */}
              {/* <Route path="surveys/preview/:id" element={<SurveyPreview />} /> */}
              <Route path="templates" element={<Templates />} />
              <Route path="audiences" element={<Audiences />} />
              <Route path="analytics" element={<Analytics />} />
            
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />

              {/* Content Management routes */}
              {/* <Route path="content" element={<ContentManagement />} /> */}
              <Route path="content/integrations" element={<Integrations />} />
              {/* <Route path="content/pricing" element={<Pricing />} /> */}
              {/* <Route path="content/contact" element={<ContactUs />} />
              
              <Route path="content/reviews" element={<Reviews />} />
           
              <Route path="content/website" element={<WebsiteContent />} /> */}
              <Route path="content/testimonials" element={<Testimonials />} />
                 <Route path="content/widgets" element={<Widgets />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
