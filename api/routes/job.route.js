import express from "express";
import { createJob, getAllJob } from "../controllers/job.controller.js";


const router=express.Router()


router.post('/addjob',createJob)
router.get('/alljobs',getAllJob)

export default router