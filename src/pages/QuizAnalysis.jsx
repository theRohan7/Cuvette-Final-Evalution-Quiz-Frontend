import React, { useEffect, useState } from 'react'
import "../css/QuizAnalysis.css"
import CreateQuiz from '../components/CreateQuiz';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteQuiz, editQuiz, getAllQuiz } from '../services/quiz';
import toast from 'react-hot-toast';
import { logout } from '../services/register';

function QuizAnalysis() {
  
    const location = useLocation();

    const navigate = useNavigate();
    const [createQuiz, setCreateQuiz] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [allowEdit, setAllowEdit] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        }
        
    }, [navigate]);


    const handleCreateQuiz =() => {
        setCreateQuiz(true);
    }

    const handleCloseCreateQuiz = () => {
        setCreateQuiz(false)
        setAllowEdit(false)
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

      
  

    const handleEdit = async(quiz) => {
        setAllowEdit(true);
        const response = await editQuiz({quizID: quiz._id})
    }

    const handleDelete = async(quiz) => {
        const response =  await deleteQuiz({quizID: quiz._id})    
    }

    const handleShare = async(quiz) => {
        const quizUrl = `${window.location.origin}/take-quiz/${quiz._id}`;
        navigator.clipboard.writeText(quizUrl);
        toast.success('Quiz link copied to clipboard')
    }

    
    const handleLogout = async () => {
        const response = await logout();

        if(response.status === 200){
           localStorage.removeItem('token')
           navigate('/login'); 
        }
        
    }

    function formatImpression (Impressions) {
        if(Impressions >= 1000){
            return(Impressions/1000).toFixed(1) + "k"
        }
        return Impressions.toString();
    }
    

  return (
    <div className='analysis-dashboard'>
      <aside className='sidebar'>
          <div className="logo">QUIZZIE</div>
          <div>
            <div className="menu">
                <button type='button' onClick={() => navigate('/')} >DashBoard</button>
                <button type='button' className='active' >Analytics</button> 
                <button type='button'  onClick={handleCreateQuiz}  >Create Quiz</button> 
            </div>
          </div>
          <hr width="70%" />
          <div className="logout" onClick={handleLogout} >LOGOUT</div>
         
        </aside>
        <main className="content">
           <h2 className='title'> Quiz Analysis</h2>
           <div className="quiz-table-scroll">
           <table className='quiz-table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Quiz Name</th>
                        <th>Created on</th>
                        <th>impression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz, index) => (
                        <tr key={quiz._id} className={(index+1)%2 ===0 ? "even" : "odd"} >
                            <td>{index + 1}</td>
                            <td>{quiz.name}</td>
                            <td>{Date(quiz.date).split(' ').slice(1, 4).join(' ').trim()}</td>
                            <td>{formatImpression(quiz.impression)}</td>
                            <td>
                                <button className='action-button edit' onClick={() => handleEdit(quiz)} ><i className="ri-edit-box-line"></i></button>
                                <button className='action-button delete' onClick={() => handleDelete(quiz)} ><i className="ri-delete-bin-6-fill"></i></button>
                                <button className='action-button share' onClick={() => handleShare(quiz)} ><i className="ri-share-fill"></i></button>
                                <a onClick={() => navigate(`/question-analysis/${quiz._id}`)} className='analysis-link'>Question wise Analysis</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
           </table>

           </div>  
        </main>
        {(allowEdit || createQuiz) && <CreateQuiz  onClose = {handleCloseCreateQuiz} />}  
    </div>
  )
}

export default QuizAnalysis
