import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const createQuiz = async({name, quizType}) => {
    try {
        const URL = `${BACKEND_URL}/quiz/create-quiz`
        const token = localStorage.getItem("token")
        const response = await axios.post(URL, {
            name,
            quizType
        },
        {headers:{
            'Authorization': token
        }})
        // console.log(response.data.data);
        return response;

    } catch (error) {
        throw new Error(error.response.data.message)
    }
    
}

const getQuiz = async(quizID) => {
    try {

        const URL = `${BACKEND_URL}/quiz/${quizID}`;
       
        const response = await axios.get(URL)  
        return response;
        
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message)
        
    }
}

const getAllQuiz = async() => {
    try {

        const URL = `${BACKEND_URL}/quiz/`;
        const token = localStorage.getItem('token')

        const response = await axios.get(URL, {
            headers:{
                "Authorization": token
            }
        })

        console.log(response);
        return response;
   
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
    }
}

const addQuestion = async(questionData, quizID) => {
   try {
     console.log(questionData);
     

     const URL = `${BACKEND_URL}/quiz/add-question/${quizID}`
     const token = localStorage.getItem('token');
     const response = await axios.post(URL,{
         questionData
     }, {
         headers:{
             'Authorization': token
         }
     })
 
     console.log(response);
     return response;

   } catch (error) {
     console.log(error.response.data.message);
     throw new Error(error.response.data.message)
   }
    
}

const attemptQuiz = async (quizID, finalAnswers) => {
        
    console.log(finalAnswers);
    
  try {
      const URL = `${BACKEND_URL}/quiz/take-quiz/${quizID}`;
      const response = await axios.post(URL,{answers: finalAnswers}  );
  
      // console.log(response);
      return response;
      
  } catch (error) {
    console.error(error.response.data.message);
    throw new Error(error.response.data.message);
    
  }
}

const editQuiz = async ({quizID, quizData}) => {
    try { 
        const URL = `${BACKEND_URL}/quiz/edit-quiz/${quizID}`
        const token = localStorage.getItem('token')
    
        const response = await axios.post(URL, quizData,{
            headers: {
                "Authorization": token
            }
        })
    
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.response.data.message);
        throw new Error(error.response.data.message);
        
        
    }
    
}

const deleteQuiz = async ({quizID}) => {
    try {
        // console.log(quizID);
        
        const URL = `${BACKEND_URL}/quiz/delete/${quizID}`
        const token = localStorage.getItem('token')
    
        const response = axios.get(URL, {
            headers: {
                'Authorization': token
            }
        })
        window.location.reload();
        return response;
    } catch (error) {
        console.error(error.reponse.data.message);
        throw new Error(error.response.data.message)
        
    }
}

const questionAnalysis = async (quizID) => {
    try {
        const URL = `${BACKEND_URL}/quiz/question-analysis/${quizID}`
        const token = localStorage.getItem('token')
    
        const response = await axios.get(URL, {
            headers: {
                "Authorization": token
            }
        })
        
        // console.log(response);
        
        return response;
    } catch (error) {
        console.error(error.response.data.message);
        throw new Error(error.reponse.data.message)
      
    }
}



export { 
    createQuiz,
    getQuiz,
    getAllQuiz,
    addQuestion,
    attemptQuiz,
    editQuiz,
    deleteQuiz,
    questionAnalysis
}