"use client"

import { useNavigate } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate("/")} className="back-home">
        Back to Dashboard
      </button>
    </div>
  )
}

export default NotFound
