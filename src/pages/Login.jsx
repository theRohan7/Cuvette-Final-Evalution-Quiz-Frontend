import React from 'react'
import { useState } from 'react'
import { login } from '../services/register'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"

function Login() {

   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)
   const [userData, setUserData] = useState({
    email: "", 
    password: "",
   })

   const handleChange = (e) => {
    setUserData({
        ...userData,
        [e.target.name]: e.target.value
    })
   }

   const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    if(!userData.email || !userData.password){
        setError(true)
        toast.error("Fields are required.")
    }

    try {
        const {email, password} = userData
        const response = await login({email, password})
    
        if(response.status === 200){
            const {data} = response;
            localStorage.setItem("token", data.data.accessToken);
            toast.success("User logged in successfully.")
            navigate("/") 
        }

    } catch (error) {
        setError(true)
        toast.error("Invalid credentials")
        
    }
    finally{
        setLoading(false)
    }
   }

  return (
    <div>
        {loading ? 
        <h1>Loading...</h1> : 
         <div className="login-main">
        <div className="login-main-container">
         <h1>QUIZZIE</h1>
         <form className='login-form' onSubmit={handleSubmit}>
          <div className="login-button-container">
            <button className='tab ' type='button' onClick={() => navigate('/register')}>Sign Up</button>
            <button className='tab active' type='button' >Log In</button>
          </div>


          <div className='login-form-group'>
           <label htmlFor="email">Email</label>
           <input className={error ? 'error' :''} type="email" name='email' placeholder='Email' value={userData.email} onChange={handleChange}  />
          </div>

          <div className='login-form-group'>
           <label htmlFor="password">Password</label>
           <input className={error ? 'error' :''} type="password" name='password' placeholder='Password' value={userData.password} onChange={handleChange}  />
          </div>


           <button className='login-button' disabled={loading} type='submit'>{loading ? "Loading" :  "Sign In"}</button>
         </form>

        </div>

      </div>}
      
    </div>
  )
}

export default Login
