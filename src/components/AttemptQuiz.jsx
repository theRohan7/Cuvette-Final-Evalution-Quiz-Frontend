import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { attemptQuiz, getQuiz } from "../services/quiz";
import "../css/QuizAttempt.css"



const AttemptQuiz = () => {
    const { quizID } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQue, setCurrentQue] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null)
  
    useEffect(() => {
      const fetchQuiz = async () => {
        try {
          setLoading(true);
          const response = await getQuiz(quizID);
          
          if (response.status === 200) {
            setQuizData(response.data.data.quiz);
            resetTimer(response.data.data.quiz.questions[0].timer)
            
          }
        } catch (error) {
          console.error("Error fetching quiz: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuiz();
    }, [quizID]);

    useEffect(() => {
        if(quizData && timeRemaining > 0 && !quizCompleted){
            const timer = setTimeout(() => setTimeRemaining(prev => prev -1 ), 1000) ;
            return () => clearTimeout(timer)
        } else if (quizData && timeRemaining === 0 && !quizCompleted){
            handleNextQuestion();
        }
    },[quizData,timeRemaining, quizCompleted])

    const resetTimer = (timer) =>{
        switch(timer) {
            case '5 sec':
                setTimeRemaining(5);
                break;
            case '10 sec':
                setTimeRemaining(10);
                break;
            default:
                setTimeRemaining(9999)

        }
    };

    const handleOption = (option) => {
        setSelectedOption(option)
    };

    const handleNextQuestion = () => {
        if(!quizData) return;
        const currentQuestion = quizData.questions[currentQue];
        const answer = {
            questionID: currentQuestion._id,
            selectedOption: selectedOption,
            timeTaken: getTimeSpent(currentQuestion.timer)
        };
        setAnswers(prev => [...prev, answer]);

        if(currentQue < quizData.questions.length -1) {
            setCurrentQue( prev => prev + 1);
            setSelectedOption(null)
            resetTimer(quizData.questions[currentQue + 1].timer);
        } else {
            submitQuiz([...answers, answer])
        }
        
    };

    const getTimeSpent= (timer) => {

        switch(timer){
            case '5 sec':
                return 5000 - (timeRemaining * 1000);
            case '10 sec':
                return 10000 - (timeRemaining * 1000);
            default:
                return 0;
        }
    };

    const submitQuiz = async( finalAnswers) => {
        
        const  response = await attemptQuiz(quizID, finalAnswers)

        if(response.status === 200){
            setResult(response.data.data)
            setQuizCompleted(true)

        }
    }
  
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!quizData) {
        return <div>No quiz data available</div>;
    }
    if (quizCompleted){
        return <div>Quiz Completed! Your Score: {result.correct}/{result.attempted}</div>
    }
    
    //   console.log(quizData);
      const currentQuestion = quizData.questions[currentQue];
    //   console.log(currentQuestion);
      
    
    
  return (
  <div className="quiz-question">
    <div className="question-header">
        <span>{`${currentQue + 1}/${quizData.questions.length}`}</span>
        <span className="timer">{`00:${timeRemaining.toString().padStart(2,'0')}s`}</span>
    </div>
    <p className="question-text">{currentQuestion.questionText}</p>
    <div className="options-grid">
       {currentQuestion.options.map((option, index) => (
        <button
        key={index}
        className={`option ${selectedOption === option.text ? 'selected' :''}`}
        onClick={() => handleOption(option.text)}>
            {option.text}
        </button>
       ))}
    </div>
    <button className="next-button" onClick={handleNextQuestion}>
        NEXT
    </button>
  </div>
  )
}

export default AttemptQuiz

