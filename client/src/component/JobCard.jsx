import React from 'react'
import { FaLocationArrow } from 'react-icons/fa6'
import { GrStatusDisabled } from 'react-icons/gr'
import { FaShoppingBag } from 'react-icons/fa'
const JobCard = ({title,location,status,type,company}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div>
          <h2 className="card-title text-accent">{title}</h2>
          <h3>{company}</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-2 items-center">
            <FaLocationArrow />
            <h2 className="font-bold text-accent">{location}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <GrStatusDisabled />
            <h2 className="font-bold text-accent">{status}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <FaShoppingBag />
            <h2 className="font-bold text-accent">{type}</h2>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-accent">Edit</button>
          <button className="btn btn-accent">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default JobCard
