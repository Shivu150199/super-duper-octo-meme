import express from 'express'
import { login, signup,googleAuth } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/googleAuth', googleAuth)

export default router
