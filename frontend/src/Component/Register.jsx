import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import "./Register.css"
// import api from '../ApiConfig';
const Register = () => {

  const [userData, setUserData] = useState({ name: "", email: "", password: "" })

  const router = useNavigate()

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password) {
      try {
        const response = await axios.post("http://localhost:4000/register", { userData });
        if (response.data.success) {
          setUserData({ name: "", email: "", password: "" })
          router('/login')
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }

    } else {
      toast.error("All fields are mandtory.")
    }
  }
  // console.log(userData, "userData")

  return (
    <div id="register-main-div">
      <h1 id="register-header">Register</h1>
      <form onSubmit={handleSubmit} id="register-form">
        <label>Name</label><br />
        <input type='text' onChange={handleChange} name='name' value={userData.name} className='register-input ' /><br />
        <label>Email</label><br />
        <input type='email' onChange={handleChange} name='email' value={userData.email} className='register-input ' /><br />
        <label>Password</label><br />
        <input type='password' onChange={handleChange} name='password' value={userData.password} className='register-input ' /><br />
        <input type='submit' value='Register' className='register-input-btn ' /><br />
      </form>
      <button onClick={() => router('/login')} className='register-btn '>Login</button>
    </div>
  )
}

export default Register
