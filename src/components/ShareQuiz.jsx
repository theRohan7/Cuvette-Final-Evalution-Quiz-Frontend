import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast"
import "../css/ShareQuiz.css"

function ShareQuiz({quizID, onClose}) {

    const [quizUrl, setQuizUrl] = useState('')
    const location =  useLocation();

    useEffect(() => {
      const generatedUrl = `${window.location.origin}/take-quiz/${quizID}`;
      setQuizUrl(generatedUrl);
    },[quizID])

    console.log(quizID);
    

    const handleShare = () => {
      navigator.clipboard.writeText(quizUrl);
      toast.success('Quiz link copied to clipboard')
    }
  return (
    <div className='overlay'>
      <div className="share-quiz-container">
        <button className='close-share' onClick={onClose}>X</button>

        <h2>Congrats, your Quiz is Published!</h2>

        <div className="quiz-link-container">
          <input type="text" value={quizUrl} readOnly/>
        </div>

        <button className='share-button' onClick={handleShare} >Share</button>
      </div>
    </div>
  )
}

export default ShareQuiz;
