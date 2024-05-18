import express from 'express'
import {
  createJob,
  deleteJob,
  getAllJob,
  getSingleJob,
  updateJob,
} from '../controllers/job.controller.js'

const router = express.Router()

router.post('/addjob', createJob)
router.get('/alljobs', getAllJob)
router.get('/alljobs/:id',getSingleJob)
router.delete('/alljobs/:id', deleteJob)
router.patch('/editjobs/:id',updateJob)

export default router
