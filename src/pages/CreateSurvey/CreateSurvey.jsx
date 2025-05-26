// src/pages/CreateSurvey/CreateSurvey.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateSurvey = () => {
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    questions: []
  })
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    type: 'multiple_choice',
    options: ['', ''],
    conditions: []
  })

  const addQuestion = () => {
    setSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }))
    setCurrentQuestion({
      text: '',
      type: 'multiple_choice',
      options: ['', ''],
      conditions: []
    })
  }

  const addCondition = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      conditions: [...prev.conditions, {
        questionId: '',
        answer: '',
        action: 'show'
      }]
    }))
  }

  const saveSurvey = () => {
    // Save survey logic
    console.log('Survey saved:', survey)
    navigate('/surveys')
  }

  return (
    <div className="survey-page">
      <div className="page-header">
        <h1>Create Survey</h1>
        <button className="btn btn-primary" onClick={saveSurvey}>
          Save Survey
        </button>
      </div>

      <div className="survey-form">
        <div className="form-group">
          <label>Survey Title</label>
          <input
            type="text"
            value={survey.title}
            onChange={(e) => setSurvey({...survey, title: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Survey Description</label>
          <textarea
            value={survey.description}
            onChange={(e) => setSurvey({...survey, description: e.target.value})}
          />
        </div>

        <div className="questions-section">
          <h2>Questions</h2>
          
          <div className="question-form">
            <div className="form-group">
              <label>Question Text</label>
              <input
                type="text"
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Question Type</label>
              <select
                value={currentQuestion.type}
                onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value})}
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="text">Text</option>
                <option value="rating">Rating (1-5)</option>
                <option value="nps">NPS (0-10)</option>
              </select>
            </div>

            {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'checkbox') && (
              <div className="options-section">
                <label>Options</label>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="option-row">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentQuestion.options]
                        newOptions[index] = e.target.value
                        setCurrentQuestion({...currentQuestion, options: newOptions})
                      }}
                    />
                    <button
                      onClick={() => {
                        const newOptions = [...currentQuestion.options]
                        newOptions.splice(index, 1)
                        setCurrentQuestion({...currentQuestion, options: newOptions})
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setCurrentQuestion({
                    ...currentQuestion,
                    options: [...currentQuestion.options, '']
                  })}
                >
                  Add Option
                </button>
              </div>
            )}

            <div className="conditions-section">
              <label>Conditional Logic</label>
              {currentQuestion.conditions.map((condition, index) => (
                <div key={index} className="condition-row">
                  <select
                    value={condition.questionId}
                    onChange={(e) => {
                      const newConditions = [...currentQuestion.conditions]
                      newConditions[index].questionId = e.target.value
                      setCurrentQuestion({...currentQuestion, conditions: newConditions})
                    }}
                  >
                    <option value="">Select question</option>
                    {survey.questions.map((q, i) => (
                      <option key={i} value={i}>{q.text.substring(0, 30)}...</option>
                    ))}
                  </select>
                  <select
                    value={condition.answer}
                    onChange={(e) => {
                      const newConditions = [...currentQuestion.conditions]
                      newConditions[index].answer = e.target.value
                      setCurrentQuestion({...currentQuestion, conditions: newConditions})
                    }}
                  >
                    <option value="">Select answer</option>
                    {survey.questions[condition.questionId]?.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={condition.action}
                    onChange={(e) => {
                      const newConditions = [...currentQuestion.conditions]
                      newConditions[index].action = e.target.value
                      setCurrentQuestion({...currentQuestion, conditions: newConditions})
                    }}
                  >
                    <option value="show">Show if</option>
                    <option value="hide">Hide if</option>
                  </select>
                  <button
                    onClick={() => {
                      const newConditions = [...currentQuestion.conditions]
                      newConditions.splice(index, 1)
                      setCurrentQuestion({...currentQuestion, conditions: newConditions})
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addCondition}>
                Add Condition
              </button>
            </div>

            <button type="button" onClick={addQuestion}>
              Add Question
            </button>
          </div>

          <div className="questions-list">
            {survey.questions.map((question, index) => (
              <div key={index} className="question-card">
                <h3>{question.text}</h3>
                <p>Type: {question.type}</p>
                {question.conditions.length > 0 && (
                  <p>Conditional: {question.conditions.length} rules</p>
                )}
                <button
                  onClick={() => {
                    setCurrentQuestion(question)
                    setSurvey(prev => ({
                      ...prev,
                      questions: prev.questions.filter((q, i) => i !== index)
                    }))
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSurvey