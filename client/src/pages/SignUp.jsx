import { Link, useNavigate } from 'react-router-dom'
import Input from '../component/Input'
import signups from '../assets/signup.svg'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { createSignup } from '../redux/userSlice'
import Oauth from '../component/Oauth'
import { toast } from 'react-toastify'
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(dispatch)
  // const [formData,setFormData]=useState({})
  const [data, setData] = useState(null)

  const { error, loading, user } = useSelector((state) => state.userState)

  const handleChange = (e) => {
    // dispatch({type:'HANDLECHANGE',payload:{id:e.target.id,value:e.target.value}})
    setData({ ...data, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
try{
   dispatch(createSignup(data)).then(()=>{

     navigate('/login')
     
   })
   
}catch(err){
  console.log(err)
 
}
 
  }

if(loading){
  return <h1>loading .......</h1>
}
  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="p-4 flex items-center justify-center ">
        <img src={signups} alt="" className="w-96 hidden md:block" />
      </div>
      <div className="flex items-center justify-center h-full overflow-scroll">
        <form
          className=" p-2  rounded flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-center my-4 text-teal-700">
            Signup Form
          </h2>
          <Input
            id="username"
            type="text"
            placehodler="Username"
            label="Username"
            onChange={handleChange}
          />
          <Input
            id="email"
            type="email"
            placehodler="Email"
            label="Email "
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placehodler="Password"
            label="password"
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            type="password"
            placehodler="Confirm Password"
            label="Confirm password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            className="btn mt-5 w-[20rem] capitalize"
          >
            {loading ? 'loading..' : 'sign up'}
          </button>
          <Oauth/>
          <div className="text-red-700 flex items-center justify-center">
            {error ? error.message : ''}
          </div>
          <div className="flex items-center justify-center mt-2 gap-2">
            <Link to="/login" className="text-xs text-blue-600">
              Already have an account
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

export default SignUp
