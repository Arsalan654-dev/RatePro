"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md"
import "./SurveyList.css"

const SurveyList = ({ limit = 5 }) => {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      const dummySurveys = [
        {
          id: 1,
          title: "Customer Satisfaction Survey",
          status: "Active",
          responses: 245,
          created: "2023-05-15",
          lastUpdated: "2023-06-01",
        },
        {
          id: 2,
          title: "Product Feedback Survey",
          status: "Active",
          responses: 189,
          created: "2023-05-20",
          lastUpdated: "2023-05-28",
        },
        {
          id: 3,
          title: "Employee Engagement Survey",
          status: "Draft",
          responses: 0,
          created: "2023-06-01",
          lastUpdated: "2023-06-01",
        },
        {
          id: 4,
          title: "Website Usability Survey",
          status: "Active",
          responses: 78,
          created: "2023-05-10",
          lastUpdated: "2023-05-25",
        },
        {
          id: 5,
          title: "Market Research Survey",
          status: "Completed",
          responses: 312,
          created: "2023-04-15",
          lastUpdated: "2023-05-15",
        },
        {
          id: 6,
          title: "Event Feedback Survey",
          status: "Active",
          responses: 56,
          created: "2023-05-25",
          lastUpdated: "2023-05-30",
        },
      ]

      setSurveys(dummySurveys.slice(0, limit))
      setLoading(false)
    }, 800)
  }, [limit])

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status-badge active"
      case "Draft":
        return "status-badge inactive"
      case "Completed":
        return "status-badge completed"
      default:
        return "status-badge inactive"
    }
  }

  if (loading) {
    return <div className="loading">Loading surveys...</div>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Survey Title</th>
            <th>Status</th>
            <th>Responses</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td>
                <Link to={`/surveys/${survey.id}`} className="text-primary font-weight-medium">
                  {survey.title}
                </Link>
              </td>
              <td className="text-center">
                <span className={getStatusClass(survey.status)}>{survey.status}</span>
              </td>
              <td className="text-center">{survey.responses}</td>
              <td>{survey.created}</td>
              <td>{survey.lastUpdated}</td>
              <td>
                <div className="actions d-flex justify-content-center">
                  <button className="p-1" title="View">
                    <MdVisibility />
                  </button>
                  <button className="p-1" title="Edit">
                    <MdEdit />
                  </button>
                  <button className="p-1 delete" title="Delete">
                    <MdDelete />
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

export default SurveyList
