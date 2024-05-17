import React, { useState } from 'react'
import Input from '../component/Input'
import SelectInput from '../component/SelectInput'

import {useDispatch, useSelector} from 'react-redux'
import { createJob, handleJob } from '../redux/jobSlice'
import { toast } from 'react-toastify'

const AddJob = () => {
const dispatch=useDispatch()
const {loading,formData,error}=useSelector(state=>state.jobState)
console.log(formData)
 

  const handlechange=(e)=>{
  
    dispatch(handleJob({...formData,[e.target.id]:e.target.value}))
  }
const handleSubmit=async(e)=>{
  console.log(e)
  e.preventDefault()
try{

dispatch(createJob(formData))




}catch(err){
  console.log(err)
 
}
}


  return (
    <section className="flex items-center justify-center p-10">
      <div className=" bg-zinc-700 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-medium">Add Job</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Write position" label="Position" onChange={handlechange} id='position' />
          <Input type="text" placeholder="Write Coompany" label="Company" onChange={handlechange} id='company' />
          <Input
            type="text"
            placeholder="Write Location"
            label="Job Location"
            id='location'
            onChange={handlechange}
          />
          {/* 
          <select name="status" id="status">
            <option value="pending">Pending</option>
            <option value="interview">interview</option>
            <option value="declined">Declined</option>
          </select> */}
          <SelectInput
            fo="Pending"
            so="interview"
            to="declined"
            label="Job Status"
            id='jobstatus'
            onChange={handlechange}
          />
          <SelectInput
            fo="Full Time"
            so="Part Time"
            to="Interview"
            label="Job type"
            id='jobtype'
            onChange={handlechange}
          />
          {/* <select name="type" id="type">
            <option value="fulltime">Full Time</option>
            <option value="parttime">parttime</option>
            <option value="Internship">Internship</option>
          </select> */}
          <div className="flex items-end justify-center">
            <button
              type="submit"
              className="input input-bordered w-full max-w-xs bg-teal-800 hover:bg-teal-500 hover:text-black"
            >
             {loading?'loading....':'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddJob
