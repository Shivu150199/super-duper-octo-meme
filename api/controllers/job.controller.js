import JobModel from '../model/job.model.js'

import { errorHandler } from '../utils/error.js'

export const createJob = async (req, res, next) => {
  try {
    let job = await JobModel.create(req.body)
    console.log(job)
    res.status(200).json({
      status: 'success',
      data: job,
    })
  } catch (err) {
    console.log(err)
    next(errorHandler(404, 'problem with connection with frontend'))
  }
}

export const getAllJob = async (req, res, next) => {
  try {
    // const queryObj = { ...req.query }
    // console.log(queryObj)
    // const excludeFields = ['page', 'feilds', 'sort', 'limit']
    // excludeFields.forEach((el) => queryObj[el])
    // let queryStr = JSON.stringify(queryObj)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    // let query = JobModel.find(JSON.parse(queryStr))

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join('')
    //   query = query.sort(sortBy)
    // } else {
    //   query = query.sort('-createdAt')
    // }

    // if (req.query.fields) {
    //   const field = req.query.fields.split(',').join(' ') // Converting comma-separated fields into space-separated for field selection
    //   query = query.select(field)
    // } else {
    //   query = query.select('-__v') // Excluding '__v' field from query results by default
    // }

    // const page = req.query.pafe * 1 || 1

    // const limit = req.query.limit * 1 || 100

    // const skip = (page - 1) * limit

    // query.skip(skip).limit(limit)
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments()
    //   if (skip >= numTours) {
    //     throw new Error('This page does not exist.') // Throw error if page number is out of range
    //   }
    // }

    let alljob = await JobModel.find()

    res.status(200).json({
      status: 'suceess',
      data: alljob,
    })
  } catch (err) {
    next(errorHandler(404, 'problem in getting all jobs from data base'))
  }
}

export const getSingleJob=async(req,res,next)=>{

try{
const singleJob=await JobModel.findById(req.params.id)
if(!singleJob) return next(errorHandler(404, 'not able to find this job'))
res.status(200).json({
  status:'success',
  data:singleJob,
})

}catch(err){
  next(err)
}
}

export const deleteJob = async (req, res, next) => {
  try {
    let { id } = req.params

    const deleteJob=await JobModel.findByIdAndDelete(id)
    res.status(200).json({
      status:'success',
      data:deleteJob,
    })
  } catch (err) {
    next(err)
  }
}


export const updateJob=async(req,res,next)=>{
try{
  const newJob=await JobModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
  })

  res.status(200).json({
    status:'success',
    data:newJob,
  })

}catch(err){
next(err)
}
}
