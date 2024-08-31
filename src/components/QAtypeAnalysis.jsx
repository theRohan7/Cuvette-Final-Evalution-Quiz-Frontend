import React from 'react'
import "../css/QueAnalysis.css"

function QAtypeAnalysis({quizAnalysisData}) {
  return (
    <div className='container'>
      <div className="analysis-header">

        <h2 className='quiz-title' >{quizAnalysisData.quizName} - Question Analysis</h2>
        <div className='creation-impression'>
          <span>Created on: {Date(quizAnalysisData.createdOn).split(' ').slice(1, 4).join(' ').trim()}</span>
          <span>Impressions: {quizAnalysisData.analysis.impressions}</span>
        </div>

      </div>

     {quizAnalysisData.analysis.questionAnalysis.map((question, index) => (

      <div className="question-container" key={question.questionID} >
        <h2 className='question-title' >
          Q.{index + 1} { question.questionID.questionText }
        </h2>
        <div className="stats-container">

          <div className="statBox">
            <p className='statValue' >{question.totalAttempt}</p>
            <p className='statLabel' >People Attempted the question</p>
          </div>

          <div className="statBox">
            <p className='statValue' >{question.totalCorrect}</p>
            <p className='statLabel' >People Answered Correctly</p>
          </div>

          <div className="statBox">
            <p className='statValue' >{question.totalIncorrect}</p>
            <p className='statLabel' >People Answered Incorrectly</p>
          </div>

        </div>
      </div>
    ))};

  </div>
  )
}

export default QAtypeAnalysis
