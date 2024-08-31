import React, { useEffect, useState } from 'react'
import "../css/Home.css"
import CreateQuiz from '../components/CreateQuiz';
import { getAllQuiz } from '../services/quiz';
import { useNavigate } from 'react-router-dom';






function Home() {
    const navigate = useNavigate();
    const [createQuiz, setCreateQuiz] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    

    const handleCreateQuiz =() => {
        setCreateQuiz(true);
    }

    const handleCloseCreateQuiz = () => {
        setCreateQuiz(false)
    }
    
    useEffect(() => {
        const fetchAllQuiz = async() => {
            const response = await getAllQuiz();
            if(response.status === 200){
                setQuizzes(response.data.data)
            }

        }
         fetchAllQuiz();

    },[])

    const sortedQuizzes = quizzes.sort((a, b) => new Date(b.date) - new Date(a.Date))
    const trendingQuizzzes  = sortedQuizzes.slice(0, 9);

    const totalQuestions = quizzes.reduce((total, quiz) => {
        return total + quiz.questions.length;
      }, 0);

    const totalImpressions = quizzes.reduce((total, quiz) => {
        return total + quiz.impression;
      }, 0);

    function formatImpression (totalImpressions) {
        if(totalImpressions >= 1000){
            return(totalImpressions/1000).toFixed(1) + "k"
        }
        return totalImpressions.toString();
    }

    const impression = formatImpression(totalImpressions) 
    

       

  return (
    <div className="dashboard">
        <aside className='sidebar'>
          <div className="logo">QUIZZIE</div>
          <div>
            <div className="menu">
                <button type='button' className='active'>DashBoard</button>
                <button type='button' onClick={()=> navigate('/quiz-analysis')}  >Analytics</button> 
                <button type='button' onClick={handleCreateQuiz} >Create Quiz</button> 
            </div>
          </div>
          <hr width="70%" />
          <div className="logout">LOGOUT</div>
         
        </aside>
        <main className='content'>
            <div className="stats">
                <div className="stat quiz-created">
                    <h2>{quizzes.length}</h2>
                    <p>Quiz Created</p>
                </div>

                <div className="stat que-created">
                    <h2>{totalQuestions}</h2>
                    <p>Question created</p>
                </div>

                <div className="stat total-impression">
                    <h2>{impression}</h2>
                    <p>Total Impression</p>
                </div>
            </div>
            <section className='trending-quizzes'>
                <h2>Trending Quizzes</h2>
                <div className='quizzes'>
                    {trendingQuizzzes.map((quiz, index) => (        
                        <div key={index} className='quiz'>
                            <div className="quiz-detail">
                                <h3>{quiz.name}</h3>
                                <p className='created-on' >Created on: {Date(quiz.date).split(' ').slice(1, 4).join(' ').trim()}</p>   
                            </div>
                            <p className='impression' >{quiz.impression} <i className="ri-eye-line"></i></p>
                        </div>
                    ))}
                </div>

            </section>

        </main>
        {createQuiz && <CreateQuiz onClose = {handleCloseCreateQuiz} />}  
    </div>
  )
}

export default Home
