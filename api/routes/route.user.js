import express from 'express'
import { login, signup,googleAuth, updateUser, getAllUsers } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/googleAuth', googleAuth)
router.get('/alluser',getAllUsers)
router.patch('/update/:id',updateUser)

export default router
