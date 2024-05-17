import { Link, useNavigate } from 'react-router-dom'
import  Input  from '../component/Input'
import login from '../assets/login.svg'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createLogin } from '../redux/userSlice'
import Oauth from '../component/Oauth'

const LoginPage = () => {
  const [formData, setFormData] = useState(null)
  // const [loading, setLoading] = useState(false)
  let {loading,error}=useSelector((state=>state.userState))
  // const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch=useDispatch()
const handleChange = (e) => {

  
  setFormData({ ...formData, [e.target.id]: e.target.value })
}



const handleSubmit = async (e) => {
  e.preventDefault()
try{
  dispatch(createLogin(formData)).then(()=>{
    navigate('/alljob')
  })

}catch(error){
console.log(error)
}


}

  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 flex items-center justify-center ">
        <img src={login} alt="" className="w-96 hidden md:block" />
      </div>
      <div className="flex items-center justify-center h-full">
        <form className=" p-2  rounded flex flex-col items-center " onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-center my-4 text-teal-700">
            Login Form
          </h2>
       
          <Input type="email" placehodler="Username" label="Email" id="email" onChange={handleChange} />
          <Input type="password" placehodler="Username" label="password" id='password' onChange={handleChange} />
          {/* <button className="btn mt-5 w-[20rem]">Submit</button> */}
          <button type='submit'  className="btn mt-5 w-[20rem]">{loading?'loading...':'Login'}</button>
<Oauth/>
          <div className="flex items-center justify-center mt-2 gap-2">
            <Link to="/signup" className="text-xs text-blue-600">
              Create new account
            </Link>
            <Link to="/forgotpassword" className="text-xs text-blue-600">
              Forgot Password ?
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
