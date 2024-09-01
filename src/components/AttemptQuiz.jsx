import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { attemptQuiz, getQuiz } from "../services/quiz";
import "../css/AttemptQuiz.css"




const AttemptQuiz = () => {
    const { quizID } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQue, setCurrentQue] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [answers, setAnswers] = useState([]);
  
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
    }, [quizID, quizCompleted]);

    

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
    
        console.log(finalAnswers);
        
        const  response = await attemptQuiz(quizID, finalAnswers)
        console.log(response.data);
        
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

    if(quizCompleted) {
      return (
        <div className="result-container">
          <h3 className="result-header">{quizData.quizType === "Q&A" ? 'Congrats Quiz is completed': 'Thank you for participating in the Poll.'}</h3>
          <img className="trophy-image" src="https://s3-alpha-sig.figma.com/img/f47f/6d98/a013b07f931834dfba3cd6ddc9130436?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hqgWGAHO1eoSVRrHiuP4GggRnoZT5~hNNRliyDBS~3Xsjz9uvHvcwBMIAkUjDOvR1X0Sz4IL17PmHvFPEojOw713O3YL~wR7KC6iwNtwC4RTZWwQRnbm10-GEqyFQ5S88k~2Ts6J8HekuikNXTRAQiCZUvQJv7hN19isOMyXlPY6SAp43wmE3a24Am~weZPVSs33iv3ADjGRVWxZdvkNSsu--LyWF4chWOYam18dgGqEjUE0~JoBOO5vraDdoe45YymaUwl88H13Oa-VN2OSR5m2RwrUPwJaHFv19cOgSUx1A2~Ma0SDfG4755t0SnAa69u2lp5RdRuHY1FtGfgToQ__" alt="Trophy Image" />
        </div>
      )
    }


    const currentQuestion = quizData.questions[currentQue];

    if(currentQuestion.optionType === "Image"){
        return (
        <div className="full-container">
  
        <div className="quiz-container">
          <div className="quiz-question">
            <div className="que-header">
              <span className="que-no">{`${currentQue + 1}/${quizData.questions.length}`}</span>
              <span className={currentQuestion.timer === "OFF" ? `timer-off` : 'que-timer'}>{`00:${timeRemaining
                .toString()
                .padStart(2, "0")}s `}</span>
            </div>
            <p className="que-text">{currentQuestion.questionText}</p>
            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`imageOption ${
                    selectedOption === option.imageUrl ? "selected" : ""
                  }`}
                  onClick={() => handleOption(option.imageUrl)}
                >
                  <img src={option.imageUrl} className="option-image" />
                </button>
              ))}
            </div>
            <button className="next-btn" onClick={handleNextQuestion}>
              NEXT
            </button>
          </div>
        </div>
        </div> 
        );
    }
  
    
  return (
    <div className="full-container">
    <div className="quiz-container">
      <div className="quiz-question">
        <div className="que-header">
          <span className="que-no" >{`${currentQue + 1}/${quizData.questions.length}`}</span>
          <span className="que-timer">{`00:${timeRemaining
            .toString()
            .padStart(2, "0")}s`}</span>
        </div>
        <p className="que-text">{currentQuestion.questionText}</p>
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedOption === option.text ? "selected" : ""
              }`}
              onClick={() => handleOption(option.text)}
            >
              {option.text}
            </button>
          ))}
        </div>
        <button className="next-btn" onClick={handleNextQuestion}>
          NEXT
        </button>
      </div>
    </div>
    </div>
  );
}


export default AttemptQuiz

