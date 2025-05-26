"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  MdAssignment,
  MdPeople,
  MdInsertChart,
  MdHeadsetMic,
  MdArrowUpward,
  MdArrowDownward,
  MdDashboard,
} from "react-icons/md"
import SurveyList from "../../components/SurveyList/SurveyList.jsx"
import RecentResponses from "../../components/RecentResponses/RecentResponses.jsx"
import SatisfactionChart from "../../components/SatisfactionChart/SatisfactionChart.jsx"
import "./Dashboard.css"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    totalResponses: 0,
    averageSatisfaction: 0,
  })

  const [activeTab, setActiveTab] = useState("recent")

  // Simulating data fetching
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalSurveys: 24,
        activeSurveys: 8,
        totalResponses: 1256,
        averageSatisfaction: 4.2,
      })
    }, 500)
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header mb-4">
        <h1 className="font-weight-medium">Dashboard</h1>
        <div className="d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center text-secondary">
            <MdDashboard className="mr-1" />
            Dashboard
          </Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="card p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="font-weight-medium mb-1">Total Surveys</p>
              <h3 className="font-weight-bold mb-0">{stats.totalSurveys}</h3>
            </div>
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <MdAssignment className="text-white" style={{ fontSize: "24px" }} />
            </div>
          </div>
          <p className="font-weight-medium text-sm mt-3 mb-0 d-flex align-items-center">
            <span className="d-flex align-items-center text-success mr-1">
              <MdArrowUpward style={{ fontSize: "14px" }} /> +{stats.activeSurveys}
            </span>
            Active surveys
          </p>
        </div>

        <div className="card p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="font-weight-medium mb-1">Total Responses</p>
              <h3 className="font-weight-bold mb-0">{stats.totalResponses}</h3>
            </div>
            <div
              className="d-flex align-items-center justify-content-center bg-purple rounded-circle"
              style={{ width: "50px", height: "50px", backgroundColor: "#6f42c1" }}
            >
              <MdPeople className="text-white" style={{ fontSize: "24px" }} />
            </div>
          </div>
          <p className="font-weight-medium text-sm mt-3 mb-0 d-flex align-items-center">
            <span className="d-flex align-items-center text-success mr-1">
              <MdArrowUpward style={{ fontSize: "14px" }} /> +256
            </span>
            Last 30 days
          </p>
        </div>

        <div className="card p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="font-weight-medium mb-1">Avg. Satisfaction</p>
              <h3 className="font-weight-bold mb-0">{stats.averageSatisfaction}</h3>
            </div>
            <div
              className="d-flex align-items-center justify-content-center bg-warning rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <MdInsertChart className="text-white" style={{ fontSize: "24px" }} />
            </div>
          </div>
          <p className="font-weight-medium text-sm mt-3 mb-0 d-flex align-items-center">
            <span className="d-flex align-items-center text-success mr-1">
              <MdArrowUpward style={{ fontSize: "14px" }} /> +0.3
            </span>
            Out of 5
          </p>
        </div>

        <div className="card p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="font-weight-medium mb-1">Support Tickets</p>
              <h3 className="font-weight-bold mb-0">3</h3>
            </div>
            <div
              className="d-flex align-items-center justify-content-center bg-success rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <MdHeadsetMic className="text-white" style={{ fontSize: "24px" }} />
            </div>
          </div>
          <p className="font-weight-medium text-sm mt-3 mb-0 d-flex align-items-center">
            <span className="d-flex align-items-center text-danger mr-1">
              <MdArrowDownward style={{ fontSize: "14px" }} /> -2
            </span>
            2 open
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-lg-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Satisfaction Trends</h5>
                <select className="form-select" style={{ width: "auto" }}>
                  <option>Last 30 Days</option>
                  <option>Last 60 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <SatisfactionChart />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Top Performers</h5>
                <Link to="/audiences" className="text-primary">
                  View All
                </Link>
              </div>
              <div className="mt-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="d-flex align-items-center justify-content-center bg-light dark:bg-dark rounded-circle mr-3"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <MdPeople className="text-secondary" />
                      </div>
                      <div>
                        <h6 className="mb-0">Respondent {index}</h6>
                        <span className="text-sm text-secondary">ID: {10000 + index}</span>
                      </div>
                    </div>
                    <span className="font-weight-medium">{5 - (index * 0.2).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="dashboard-tabs mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "recent" ? "active" : ""}`}
                  onClick={() => setActiveTab("recent")}
                >
                  Recent Surveys
                  <span className="badge badge-primary ml-2">5</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "responses" ? "active" : ""}`}
                  onClick={() => setActiveTab("responses")}
                >
                  Recent Responses
                  <span className="badge badge-primary ml-2">10</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className={`tab-pane ${activeTab === "recent" ? "active" : ""}`}>
              <SurveyList limit={5} />
            </div>
            <div className={`tab-pane ${activeTab === "responses" ? "active" : ""}`}>
              <RecentResponses limit={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
