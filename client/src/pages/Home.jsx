import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router-dom'
import AllJob from './AllJob'
import AddJob from './AddJob'

const Home = () => {
  return (
   <>
     <Navbar/>
     

<Outlet/>

   </>

  )
}

export default Home
