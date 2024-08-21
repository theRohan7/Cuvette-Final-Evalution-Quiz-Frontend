import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";


function App() {
 

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/home" element={<Home />} />

    </Routes> 
    </>
  )
}

export default App
