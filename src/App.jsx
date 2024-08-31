import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AttemptQuiz from "./components/AttemptQuiz";
import Home from "./pages/Home";
import QuizAnalysis from "./pages/QuizAnalysis";
import QuestionAnalysis from "./pages/QuestionAnalysis";




function App() {
 

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={< Home />} />
      <Route path="/take-quiz/:quizID" element={<AttemptQuiz />} />
      <Route path="/quiz-analysis" element={<QuizAnalysis />} />
      <Route path="/question-analysis/:quizID" element={<QuestionAnalysis />} />


    </Routes> 
    </>
  )
}

export default App
