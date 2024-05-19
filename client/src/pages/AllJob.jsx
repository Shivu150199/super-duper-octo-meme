import React, { useEffect } from 'react'
import Input from '../component/Input'

import { useDispatch, useSelector } from 'react-redux'
import { allJob} from '../redux/jobSlice'
import JobCard from '../component/JobCard'
import { deleteJob } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
const AllJob = () => {
  const navigate=useNavigate()
  const { data} = useSelector((state) => state.jobState.joblist)
 
  const dispatch = useDispatch()


  const handleDelete = (uid) => {
    console.log('hello')
    dispatch(deleteJob(uid))
  }


  useEffect(() => {
    dispatch(allJob())
  }, [])

  return (
    <>
      <section className="flex items-center flex-col justify-center p-10">
        <div className=" bg-base-700 p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-medium">All Job</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input type="search" placeholder="Search" label="Serach" />

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Job status</span>
              </div>
              <select className="select select-bordered">
                <option value="All">All</option>
                <option value="interview">Interview</option>
                <option value="pending">Pending</option>
                <option value="declined">declined</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Job Type</span>
              </div>
              <select className="select select-bordered">
                <option value="All">All</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="internship">internship</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Sort</span>
              </div>
              <select className="select select-bordered">
                <option value="oldest">Oldest</option>
                <option value="newest">newest</option>
                <option value="atoz">A to Z</option>
                <option value="ztoa">Z to A</option>
              </select>
            </label>

         

            <div className="flex items-end justify-center">
              <button
                type="submit"
                className="input text-black input-bordered w-full max-w-xs bg-teal-500 hover:bg-teal-600 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className='mt-16 text-4xl font-medium '>
          <h1>All Job Details</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8 px-16">
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <JobCard
                  key={item._id}
                  status={item.jobstatus}
                  title={item.position}
                  location={item.location}
                  type={item.jobtype}
                  id={item._id}
                  eid={item._id}
                  onClick={() => handleDelete(item._id)}
                  // editClick={()=>handleEdit(item._id)}
                />
              )
            })
          ) : (
            <h1 className="text-4xl font-bold capitalize">no item found</h1>
          )}
        </div>
      </section>
    </>
  )
}

export default AllJob
