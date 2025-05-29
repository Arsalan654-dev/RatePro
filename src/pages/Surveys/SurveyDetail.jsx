// src/pages/Surveys/SurveyDetail.jsx
"use client"

import { useParams } from "react-router-dom"

const SurveyDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="survey-detail">
      <h1>Survey Details - ID: {id}</h1>
      {/* Add your survey detail content here */}
    </div>
  )
}

export default SurveyDetail