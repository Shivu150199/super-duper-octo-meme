import React, { useEffect } from 'react'
import Input from '../component/Input'
import SelectInput from '../component/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { allJob } from '../redux/jobSlice'
import JobCard from '../component/JobCard'

const AllJob = () => {
  const { data } = useSelector((state) => state.jobState.joblist)
  console.log(data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allJob())
  }, [])
  return (
    <>
      <section className="flex items-center flex-col justify-center p-10">
        <div className=" bg-zinc-700 p-6 rounded-md shadow-lg">
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

            {/* <SelectInput
            fo="Pending"
            so="interview"
            to="declined"
            label="Job Status"
          />
          <SelectInput
            fo="Full Time"
            so="Part Time"
            to="Interview"
            label="Job Status"
          /> */}
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
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-16 px-16">
          {data &&
            data.map((item) => {
              return (
                <JobCard
                  key={item._id}
                  status={item.jobstatus}
                  title={item.position}
                  location={item.location}
                  type={item.jobtype}
                />
              )
            })}
        </div>
      </section>
    </>
  )
}

export default AllJob
