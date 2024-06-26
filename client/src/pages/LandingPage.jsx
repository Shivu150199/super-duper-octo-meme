import React, { useState } from 'react'
import interview from '../assets/interviewLanding.svg'
import { Link } from 'react-router-dom'
import Theme from '../component/Theme'
const LandingPage = () => {
    const [theme, setTheme] = useState(false)
  const handleTheme=()=>{
     setTheme(!theme)
     const element = document.querySelector('html')
     console.log(element.dataset.theme)
     !theme
       ? (element.dataset.theme = 'light')
       : (element.dataset.theme = 'dark')
  }

  return (
    <section className="w-screen h-full  px-6 py-4 text-2xl">
      <div className="flex items-center justify-between">
        {' '}
        <h1 className="tracking-wider font-bold  flex items-center justify-start gap-4">
          <span className=" p-2 w-[3rem] h-[3rem] rounded button font-extrabold bg-teal-700 flex items-center justify-center">
            I
          </span>{' '}
          <span>Vault</span>
        </h1>
  <Theme/>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4">
        <div className=" gap-4 flex flex-col mb-6 md:justify-start md:items-start">
          <h2 className="text-3xl font-extrabold  tracking-wider ">
            Interview <span className="text-teal-700">Vault</span> App
          </h2>
          <p className="text-xl text-center my-4 text-slate-400 md:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            reprehenderit laboriosam placeat nostrum at saepe, nam voluptas
            laudantium quam nobis?
          </p>
          <div className="flex items-center justify-center gap-4 ">
            <Link
              to="/login"
              className="btn bg-teal-500 text-white hover:bg-teal-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn bg-teal-500 text-white hover:bg-teal-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-100 p-2 lg:w-96">
          <img src={interview} alt="image" />
        </div>
      </div>
    </section>
  )
}

export default LandingPage
