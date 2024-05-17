import mongoose from "mongoose";

let jobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'please provide your postion'],
    trim:true
  },
  company: {
    type: String,
    required: [true, 'please provide name of your company'],
  },
  location: {
    type: String,
    required: [true, 'please provide location of your company'],
  },
  jobstatus: {
    type: String,
    required: [true, 'please provide job status'],
  },
  jobtype: {
    type: String,
    required: [true, 'please provide job type'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
}) 


const JobModel=mongoose.model('Job',jobSchema)
export default JobModel 