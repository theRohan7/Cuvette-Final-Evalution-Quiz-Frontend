import React from 'react'
import "../css/QueAnalysis.css"
import { questionAnalysis } from '../services/quiz'

function PollQueAnalysis({quizAnalysisData}) {
  return (
    <div className='container'>
    <div className="analysis-header">

      <h2 className='quiz-title' >{quizAnalysisData.quizName} - Question Analysis</h2>
      <div className='creation-impression'>
        <span>Created on: {Date(quizAnalysisData.createdOn).split(' ').slice(1, 4).join(' ').trim()}</span>
        <span>Impressions: {quizAnalysisData.analysis.impressions}</span>
      </div>

    </div>
    <div className='scroll-analysis'>
    {quizAnalysisData.analysis.questionAnalysis.map((question, index) => (
      <div className="question-container" key={question.questionID} >
        <h2 className='question-title' >
          Q.{index + 1} { question.questionID.questionText }
        </h2>
        <div className="stats-container">
          {question.optionCounts.map(option => (
            
            <div className="statBox">
            <p className='statValue' >{option.count}</p>
            <p className='statLabel' >{option.optionText}</p>
          </div>
          ))}
          

        </div>
      </div>
    ))};
    </div>

  </div>
  )
}

export default PollQueAnalysis
