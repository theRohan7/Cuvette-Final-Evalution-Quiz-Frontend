import React, { useEffect } from 'react';
import { useState } from "react";
import { createQuiz } from "../services/quiz";
import toast from 'react-hot-toast';
import "../css/CreateQuiz.css"
import AddQuestion from "./AddQuestion"


function CreateQuiz({onClose}) {

    const [addQuestion, setAddQuestion] = useState(false)
    const [quizID, setQuizID] = useState(null)
    const [error, setError] = useState(false)
    const [quizData, setQuizData] = useState({
        name: "",
        quizType: "", 
    })

    const handleChange = (e) => {
     e.preventDefault();
     setQuizData({
      ...quizData, [e.target.name]: e.target.value
     })
     
    }

    const handleQuizType = (type) =>{
      setQuizData({
        ...quizData,
        quizType: type
      })
    } 
    
    useEffect(() => {},[AddQuestion])

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(quizData.name === ""){
        setError(true)
        console.error("Name Required")
      }
      if(quizData.quizType === ""){
        setError(true)
        console.error("quiz type Required")
      }

      try {
        const {name, quizType} = quizData
        const response = await createQuiz({name, quizType})      
        console.log(response);
        
        if(response.status === 200){
          const quizID = response.data.data._id
          toast.success("quiz created successfully.")
          handleAddQuestion(quizID);
        }
        

      } catch (error) {
        console.log(error);
      } 
    }

    const handleAddQuestion = (quizID) => {
      setQuizID(quizID)
      setAddQuestion(true)
    }

    const cancelAddQuestion = () => {
      setAddQuestion(false)
      onClose();
    }


    
    
  return (
    <>
    {addQuestion && !error ?  (<AddQuestion quizID={quizID}   onClose={cancelAddQuestion} />): (
      <div className="overlay">
      <div className="quiz-form-container">
       <form onSubmit={handleSubmit}>
          <div className="quiz-form-group">
           <input type='text' name='name' placeholder='Quiz name' value={quizData.name} onChange={handleChange} required/>
          </div>

          <div className="quiz-form-group">
            <label >Quiz Type</label>
            <button className={quizData.quizType === 'Q&A' ? 'selected' : ''} type='button' onClick={()=>handleQuizType('Q&A')} >Q&A</button>
            <button className={quizData.quizType === 'Poll' ? 'selected' : ''} type='button' onClick={()=>handleQuizType('Poll')} >Poll</button>
          </div>


          <div className="form-actions">
            <button type='button' className='cancel-button' onClick={onClose} >Cancel</button>
            <button type='submit' className='continue-button'>Continue</button>
          </div> 
       </form>
      </div>
    </div> 
    )}
    </>
    
  )
}

export default CreateQuiz;

