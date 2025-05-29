"use client"

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "./components/Layout/Layout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Surveys from "./pages/Surveys/Surveys.jsx"
import Templates from "./pages/Templates/Templates.jsx"
import Audiences from "./pages/Audiences/Audiences.jsx"
import Analytics from "./pages/Analytics/Analytics.jsx"
import Settings from "./pages/Settings/Settings.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"
import ResetPassword from "./pages/Auth/ResetPassword.jsx"
import EnterResetCode from "./pages/Auth/EnterResetCode.jsx"
import EnterEmail from "./pages/Auth/EnterEmail.jsx"
import ThankYou from "./pages/Settings/ThankYouPage.jsx"
import Integrations from "./pages/ContentManagement/Integrations.jsx"
import Testimonials from "./pages/ContentManagement/Testimonials.jsx"
import Widgets from "./pages/ContentManagement/Widgets.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"

import SurveyList from "./pages/Surveys/SurveyList.jsx"
import CreateSurvey from "./pages/Surveys/CreateSurvey.jsx"
// Add to your App.jsx imports
import SurveyDetail from "./pages/Surveys/SurveyDetail.jsx";
import SurveyResponses from "./pages/Surveys/SurveyResponses.jsx";
import SurveyAnalytics from "./pages/Surveys/SurveyAnalytics.jsx";
import SurveySchedule from "./pages/Surveys/SurveySchedule.jsx"
import UserList from "./pages/UserManagement/UserList.jsx";
import UserForm from "./pages/UserManagement/UserForm.jsx";
import "./App.css"


function App() {
  

  const [darkMode, setDarkMode] = useState(() => {
  try {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (err) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
});

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
 
  

  return (
    <Router>
   


      <div className={`app-container ${darkMode ? "dark" : "light"}`}>
        <Routes>
           {/* Auth Pages */}
          <Route path="/login" element={<Login /> }/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/enter-reset-code" element={<EnterResetCode />} />
          <Route path="/enter-email" element={<EnterEmail />} />
          
          {/* Public routes */}
          <Route path="/thank-you" element={<ThankYou />} />

           {/* Protected layout */}
          <Route path="/" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
            <Route index element={<Dashboard />} />
            {/* Survey Management */}
            <Route path="surveys" element={<SurveyList />} />
            <Route path="surveys/create" element={<CreateSurvey />} />
            <Route path="surveys/:id" element={<SurveyDetail />} />
            <Route path="surveys/:id/responses" element={<SurveyResponses />} />
            <Route path="surveys/:id/analytics" element={<SurveyAnalytics />} />
            <Route path="surveys/schedule" element={<SurveySchedule />} />
            
            {/* User Management */}
            <Route path="users" element={<UserList />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/:id/edit" element={<UserForm />} />


            <Route path="surveys" element={<Surveys />} />
            <Route path="surveys/create" element={<CreateSurvey />} />
            <Route path="templates" element={<Templates />} />
            <Route path="audiences" element={<Audiences />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="content/integrations" element={<Integrations />} />
            <Route path="content/testimonials" element={<Testimonials />} />
            <Route path="content/widgets" element={<Widgets />} />
          </Route>
         

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
