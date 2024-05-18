import React, { useEffect, useState } from 'react'
import Input from '../component/Input'
import SelectInput from '../component/SelectInput'

import { useDispatch, useSelector } from 'react-redux'
import {  editJob, getSingleJob, handleEditJob, handleJob } from '../redux/jobSlice'
import { useNavigate, useParams } from 'react-router-dom'

const EditJob = () => {
  const navigate=useNavigate()
  const {id}=useParams()
  const dispatch = useDispatch()
  const { loading,singleJobState} = useSelector((state) => state.jobState)
  const [editData,setEditData]=useState(singleJobState)


  const handlechange = (e) => {
setEditData({...singleJobState,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
try{
dispatch(editJob({id,editData}))
navigate('/alljob')
}catch(err){
  console.log(err)
}
  }
console.log(editData)

  return (
    <section className="flex items-center justify-center p-10">
      <div className=" bg-zinc-700 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-medium">Edit Job</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Position</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </div>
            <input
              defaultValue={singleJobState.position}
              type="text"
              placeholder="Write position"
              label="Position"
              onChange={handlechange}
              className="input input-bordered w-full max-w-xs"
              id="position"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Company</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </div>

            <input
              defaultValue={singleJobState.company}
              type="text"
              placeholder="Write Coompany"
              label="Company"
              onChange={handlechange}
              id="company"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Location</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </div>
            <input
              defaultValue={singleJobState.location}
              type="text"
              placeholder="Write Location"
              label="Job Location"
              id="location"
              onChange={handlechange}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Job status</span>
            </div>
            <select
              className="select select-bordered"
              name="status"
              id="jobstatus"
              onChange={handlechange}
              defaultValue={singleJobState.jobstatus}
            >
              <option disabled>Choose an option</option>
              <option value="pending">Pending</option>
              <option value="interview">interview</option>
              <option value="declined">Declined</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Job Type</span>
            </div>
            <select
              name="jobtype"
              id="jobtype"
              className="select select-bordered"
              onChange={handlechange}
              defaultValue={singleJobState.jobtype}
            >
              <option disabled>Choose an option</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">parttime</option>
              <option value="Internship">Internship</option>
            </select>
          </label>

          <div className="flex items-end justify-center">
            <button
              type="submit"
              className="input input-bordered w-full max-w-xs bg-teal-800 hover:bg-teal-500 hover:text-black"
            >
              {loading ? 'loading....' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditJob
