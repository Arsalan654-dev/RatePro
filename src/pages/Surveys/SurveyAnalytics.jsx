// src/pages/Surveys/SurveyAnalytics.jsx
"use client"

import { useParams } from "react-router-dom"

const SurveyAnalytics = () => {
  const { id } = useParams()
  
  return (
    <div className="survey-analytics">
      <h1>Survey Analytics - ID: {id}</h1>
      {/* Add your charts and analytics here */}
    </div>
  )
}

export default SurveyAnalytics