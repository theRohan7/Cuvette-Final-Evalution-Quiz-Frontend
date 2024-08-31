import React, { useState } from 'react';
import { addQuestion } from '../services/quiz';
import toast from 'react-hot-toast';
import "../css/AddQuestion.css";
import ShareQuiz from "./ShareQuiz"

function AddQuestion({quizID, onClose}) {
    

    const [shareReady, setShareReady] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questionData, setQuestionData] = useState([
      {
        quizID: quizID,
        questionText: "",
        optionType: "Text",
        options: [
            {text: '',imageUrl:'', isCorrect:false},
            {text: '',imageUrl:'', isCorrect:false},
        ],
        timer: 'OFF'
      },
    ]);

    const handleAddQuestion = () => {
        if(questionData.length < 5){
            setQuestionData([
              ...questionData,
              {
                quizId: quizID,
                questionText: "",
                optionType: "Text",
                options: [
                  {
                    text: "",
                    imageUrl:"",
                    isCorrect: false,
                  },
                ],
              },
            ]);
            setCurrentQuestionIndex(questionData.length)
        }
    };

    const handleChange = (idx, value) => {
       const newQuestions = [...questionData];
       newQuestions[idx].questionText = value;
       setQuestionData(newQuestions);
    }

    const handleOptionTypeChange = (idx, value) => {
        const newQuestions = [...questionData];
        newQuestions[idx].optionType = value;
        setQuestionData(newQuestions);
    }

    const handleOptionChange = (queIndex, optionIndex, value) => {
        var newQuestion = [...questionData];
        if(newQuestion[queIndex].optionType === "Text"){
            newQuestion[queIndex].options[optionIndex].text = value;
        }
         if(newQuestion[queIndex].optionType === "Image"){
            newQuestion[queIndex].options[optionIndex].imageUrl = value;
        }
        setQuestionData(newQuestion);
    }

    const addOption = (queIndex) => {
        if(questionData[queIndex].options.length < 4){
            const newQuestion = [...questionData];
            newQuestion[queIndex].options.push({text:'',isCorrect: false});
            setQuestionData(newQuestion);
        }
    };

    const removeOption = (queIndex, optionIndex) => {
        const newQuestion = [...questionData];
        newQuestion[queIndex].options.splice(optionIndex, 1);
        setQuestionData(newQuestion)
    }

    const handleCorrectAnswerChange = (queIndex, optionIndex) => {
        const newQuestion = [...questionData]
        newQuestion[queIndex].options.forEach((option, index) => {
            option.isCorrect = index === optionIndex;
        });
        setQuestionData(newQuestion);
    }

    const handleTimer = (questionIndex, value) => {
        const newQuestion = [...questionData];
        newQuestion[questionIndex].timer = value
        setQuestionData(newQuestion)
    }
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await addQuestion(questionData, quizID)

            console.log(response);
            
            if(response.status === 200){
                toast.success("question created !!");
                handleShare();
            }

        } catch (error) {
            console.log(error)   
        }
        finally{
            setQuestionData([
                {
                  quizID: quizID,
                  questionText: "",
                  optionType: "Text",
                  options: [
                      {text: '',imageUrl:"", isCorrect:false},
                      {text: '',imageUrl:"", isCorrect:false},
                  ],
                  timer: 'OFF'
                },
              ]);
              setCurrentQuestionIndex(0)
        }
        
    }

    useState(()=>{},[shareReady])

    const handleShare = () => {
        setShareReady(true)
    }

    const cancelShare = () => {
        setShareReady(false)
    }

    console.log(questionData);
    
    

 
  return (
    <>
    {shareReady ? (<ShareQuiz quizID={quizID} onClose={cancelShare} />) : (

            <div className="overlay">
            <div className="questions-form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="question-header">
                            <div>
                            <label className="question-number">{currentQuestionIndex + 1}</label>
                            {currentQuestionIndex === questionData.length -1 && questionData.length < 5 && (
                                <button type='button' onClick={() => {handleAddQuestion(); setCurrentQuestionIndex(currentQuestionIndex + 1); }} className='add-question'>+</button>
                            )}
                            </div>
                            <span>Max 5 Questions</span>
                        </div>
                        
                        <div className="question-form-group">
                            <input 
                            type="text" 
                            placeholder='Question Here'
                            value={questionData[currentQuestionIndex].questionText} 
                            onChange={(e)=> handleChange(currentQuestionIndex, e.target.value)}
                            className='question-input'/>
                        </div>

                        <div className="question-form-group">
                            <div className='option-types' >
                                <label>Option Type</label>
                                <div className="option-type">
                                    <label>
                                    <input
                                        type="radio"
                                        value="Text"
                                        checked={questionData[currentQuestionIndex].optionType === 'Text'}
                                        onChange={() => handleOptionTypeChange(currentQuestionIndex, 'Text')}
                                    /> Text
                                    </label>
                                    <label>
                                    <input
                                        type="radio"
                                        value="Image"
                                        checked={questionData[currentQuestionIndex].optionType === 'Image'}
                                        onChange={() => handleOptionTypeChange(currentQuestionIndex, 'Image')}
                                    /> Image URL
                                    </label>
                                    <label>
                                    <input
                                        type="radio"
                                        value="Text & Image URL"
                                        checked={questionData[currentQuestionIndex].optionType === 'Text & Image URL'}
                                        onChange={() => handleOptionTypeChange(currentQuestionIndex, 'Text & Image URL')}
                                    /> Text & Image URL
                                    </label>

                                </div>
                            </div>
                        </div>
                        
                        <div className="option-and-timer">
                            <div>
                                {questionData[currentQuestionIndex].options.map((option, optionIndex) => (
                                    <div key={optionIndex} className='question-form-group'>

                                        <label className='correct-answer' htmlFor='option'>
                                            <input type="radio"
                                            checked={option.isCorrect}
                                            onChange={() => handleCorrectAnswerChange(currentQuestionIndex, optionIndex)} 
                                            /> 
                                        </label>

                                        <input 
                                        name='option'
                                        type="text"
                                        placeholder='Enter option'
                                        value={questionData[currentQuestionIndex].optionType === "Text" ? option.text : option.imageUrl}
                                        onChange={(e) => handleOptionChange(currentQuestionIndex, optionIndex, e.target.value)}
                                        className='option-input' 
                                        />

                                        {optionIndex >=2 && (
                                            <button type='button' onClick={() => removeOption(currentQuestionIndex,optionIndex)} className='remove-option'><i className="ri-delete-bin-6-fill"></i></button>
                                        )}

                                        
                                    </div>
                                ))}
                                {questionData[currentQuestionIndex].options.length < 4 && (
                                    <button onClick={() => addOption(currentQuestionIndex)} className='add-option' type='button' >Add Option</button>
                                )}

                            </div>
                            

                    
                            <div className="question-form-group">
                                <label className='timer-label'>Timer</label>
                                <div className="timer-section">
                                    <button type='button' className={`timer-button ${questionData[currentQuestionIndex].timer === 'OFF'}` ? `active` : ``}
                                    onClick={() =>handleTimer(currentQuestionIndex,"OFF")}> OFF </button>

                                    <button type='button' className={`timer-button ${questionData[currentQuestionIndex].timer === '5 sec'}` ? `active` : ``}
                                    onClick={() => handleTimer(currentQuestionIndex,"5 sec")}> 5 sec </button>

                                    <button type='button' className={`timer-button ${questionData[currentQuestionIndex].timer === '10 sec'}` ? `active` : ``}
                                    onClick={() => handleTimer(currentQuestionIndex,"10 sec")}> 10 sec </button>
                                </div> 
                            </div>
                        </div>

                    </div>
                    
                <div className='action-buttons'>
                    <button type='button' className='cancel-button' onClick={onClose}>Cancel</button>
                    <button className="create-button" type='submit'>Create Quiz</button>
                </div>
            </form>  
            </div>
            </div>
    )}
    </>
  )
}

export default AddQuestion;
