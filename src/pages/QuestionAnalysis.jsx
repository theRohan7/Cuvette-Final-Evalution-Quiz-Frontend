import React, { useEffect, useState } from 'react'
import CreateQuiz from '../components/CreateQuiz';
import { useNavigate, useParams } from 'react-router-dom';
import { questionAnalysis } from '../services/quiz';
import QAtypeAnalysis from '../components/QAtypeAnalysis';
import PollQueAnalysis from '../components/PollQueAnalysis';

function QuestionAnalysis() {

    const navigate = useNavigate();
    const {quizID} = useParams();
    const [createQuiz, setCreateQuiz] = useState(false)
    const [loading, setLoading] = useState(true);
    const [quizAnalysisData, setQuizAnalysisData] = useState([])

    useEffect(() => {
      const fetchAnalysisData = async(quizID) => {
        try {
          setLoading(true)
          const response = await questionAnalysis(quizID)
  
          if(response.status === 200){
            
            setQuizAnalysisData(response.data.data)
          }
        } catch (error) {
          console.error("Error Fetching Analysis data: ", error)
        }
        finally {
          setLoading(false)
        }
      }

      fetchAnalysisData(quizID);
    },[quizID])


    const handleCreateQuiz =() => {
        setCreateQuiz(true);
    }

    const handleCloseCreateQuiz = () => {
        setCreateQuiz(false)
        setAllowEdit(false)
    }

  if (loading) {
      return <div>Loading...</div>;
  }
  if (!quizAnalysisData) {
    return <div>No quiz data available</div>;
  }

  console.log(quizAnalysisData);

  

  return (
    <div className='analysis-dashboard'>
    <aside className='sidebar'>
        <div className="logo">QUIZZIE</div>
        <div>
          <div className="menu">
              <button type='button' onClick={() => navigate('/')} >DashBoard</button>
              <button type='button' onClick={() => navigate(`/quiz-analysis`)} >Analytics</button> 
              <button type='button'  onClick={handleCreateQuiz}  >Create Quiz</button> 
          </div>
        </div>
        <hr width="70%" />
        <div className="logout">LOGOUT</div>
       
      </aside>
      <main className="content">
        {quizAnalysisData.quizType === 'Q&A' ? (
          <QAtypeAnalysis quizAnalysisData= {quizAnalysisData} />
        ) : (
          <PollQueAnalysis quizAnalysisData={quizAnalysisData} />
        )}
      </main>
      {createQuiz && <CreateQuiz   onClose = {handleCloseCreateQuiz} />}  
  </div>
  )
}

export default QuestionAnalysis
