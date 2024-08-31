import React from 'react'
import "../css/QueAnalysis.css"

function PollQueAnalysis({quizAnalysisData}) {
  return (
    <div className='container'>
    <h2 className='analysis-header' >{quizAnalysisData.quizName} - Question Analysis</h2>
    <div className='creation-impression'>
      <span>Created on: {Date(quizAnalysisData.createdOn).split(' ').slice(1, 4).join(' ').trim()}</span>
      <span>Impressions: {quizAnalysisData.analysis.impressions}</span>
    </div>
    {quizAnalysisData.analysis.questionAnalysis.map((question, index) => (
      <div className="question-container" key={question.questionID} >
        <h2 className='question-title' >
          Q.{index + 1} { question.questionID.questionText }
        </h2>
        <div className="stats-container">

          <div className="statBox">
            <p className='statValue' >{question.totalAttempt}</p>
            <p className='statLabel' >Option A</p>
          </div>

          <div className="statBox">
            <p className='statValue' >{question.totalCorrect}</p>
            <p className='statLabel' >Option B</p>
          </div>

          <div className="statBox">
            <p className='statValue' >{question.totalIncorrect}</p>
            <p className='statLabel' >Option C</p>
          </div>

          <div className="statBox">
            <p className='statValue' >{question.totalCorrect}</p>
            <p className='statLabel' >Option D</p>
          </div>

        </div>
      </div>
    ))};

  </div>
  )
}

export default PollQueAnalysis
