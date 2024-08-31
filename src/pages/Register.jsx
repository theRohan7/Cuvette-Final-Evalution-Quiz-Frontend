import React from 'react'
import { useState } from 'react';
import { register } from '../services/register';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../css/Register.css"


function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChange = (e) =>{
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
    if(!userData.name || !userData.email || !userData.password){
      setError(true)
      console.error("Fields are required"); 
    }
   
    try {
      if(userData.password === confirmPassword){

        const {email, name, password} = userData
        const response = await register({email, name, password})
        console.log(response);
        if(response.status === 201){
          toast.success("User registered successfully.")
          navigate('/login')

        }

      }else {
        toast.error("Passwords do not match")
        setError(true)
        setLoading(false)
      }
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setLoading(false)
    }
  
  }


  return (
    <div>
      {loading? <h1>Loading...</h1>: 
      <div className="main">
        <div className="main-container">
         <h1>QUIZZIE</h1>
         <form className='resigter-form' onSubmit={handleSubmit}>
          <div className="button-container">
            <button className='tab active' type='button'>Sign Up</button>
            <button className='tab' type='button' onClick={() => navigate('/login')}>Log In</button>
          </div>

          <div className='form-group'>
           <label htmlFor="name">Name</label>
           <input className={error ? 'error' :''} type="text" name='name' placeholder='Name' value={userData.name} onChange={handleChange}  />
          </div>

          <div className='form-group'>
           <label htmlFor="email">Email</label>
           <input className={error ? 'error' :''} type="email" name='email' placeholder='Email' value={userData.email} onChange={handleChange}  />
          </div>

          <div className='form-group'>
           <label htmlFor="password">Password</label>
           <input className={error ? 'error' :''} type="password" name='password' placeholder='Password' value={userData.password} onChange={handleChange}  />
          </div>

          <div className='form-group'>
           <label htmlFor="confirmPassword">Confirm Password</label>
           <input className={error ? 'error' :''} type="password" name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
          </div>

           <button className='create-acc-button' disabled={loading} type='submit'>{loading ? "Loading" :  "Create Account"}</button>
         </form>

        </div>

      </div>} 
    </div>
  )
}

export default Register

