"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdVisibility } from "react-icons/md"
import "./RecentResponses.css"

const RecentResponses = ({ limit = 5 }) => {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      const dummyResponses = [
        {
          id: 1,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "John Doe",
          email: "john.doe@example.com",
          submittedAt: "2023-06-01 14:32",
          satisfaction: 4.5,
        },
        {
          id: 2,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "Jane Smith",
          email: "jane.smith@example.com",
          submittedAt: "2023-06-01 13:15",
          satisfaction: 3.8,
        },
        {
          id: 3,
          surveyId: 2,
          surveyTitle: "Product Feedback Survey",
          respondent: "Robert Johnson",
          email: "robert.j@example.com",
          submittedAt: "2023-06-01 11:45",
          satisfaction: 4.2,
        },
        {
          id: 4,
          surveyId: 4,
          surveyTitle: "Website Usability Survey",
          respondent: "Emily Davis",
          email: "emily.d@example.com",
          submittedAt: "2023-05-31 16:20",
          satisfaction: 4.0,
        },
        {
          id: 5,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "Michael Wilson",
          email: "michael.w@example.com",
          submittedAt: "2023-05-31 15:10",
          satisfaction: 4.7,
        },
        {
          id: 6,
          surveyId: 2,
          surveyTitle: "Product Feedback Survey",
          respondent: "Sarah Brown",
          email: "sarah.b@example.com",
          submittedAt: "2023-05-31 14:05",
          satisfaction: 3.5,
        },
      ]

      setResponses(dummyResponses.slice(0, limit))
      setLoading(false)
    }, 800)
  }, [limit])

  const getSatisfactionClass = (score) => {
    if (score >= 4.5) return "text-success"
    if (score >= 3.5) return "text-primary"
    if (score >= 2.5) return "text-warning"
    return "text-danger"
  }

  if (loading) {
    return <div className="loading">Loading responses...</div>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Survey</th>
            <th>Respondent</th>
            <th>Submitted At</th>
            <th>Satisfaction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id}>
              <td>
                <Link to={`/surveys/${response.surveyId}`} className="text-primary font-weight-medium">
                  {response.surveyTitle}
                </Link>
              </td>
              <td>
                <div>
                  <div className="font-weight-medium">{response.respondent}</div>
                  <div className="text-sm text-secondary">{response.email}</div>
                </div>
              </td>
              <td>{response.submittedAt}</td>
              <td className="text-center">
                <span className={`font-weight-medium ${getSatisfactionClass(response.satisfaction)}`}>
                  {response.satisfaction.toFixed(1)}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="p-1" title="View">
                    <MdVisibility />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentResponses
