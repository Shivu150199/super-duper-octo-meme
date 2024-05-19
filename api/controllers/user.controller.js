import User from '../model/auth.user.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'

dotenv.config()
const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

export const signup = async (req, res, next) => {
  try {
    let newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    })
    const token = signInToken(newUser._id)
console.log(newUser)
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    next(err)
  }
}


export const login=async(req,res,next)=>{

  try{
let { email, password } = req.body

if (!email || !password) {
  return next(errorHandler(400, 'please provide email and password'))
}

const user = await User.findOne({ email }).select('+password')
// .select('+password'): The select() method in Mongoose is used to specify which document fields should be included or excluded in the query result. In this case, '+password' indicates that the password field, which is typically excluded from query results (for security reasons), should be explicitly included in the returned user object. The leading + sign before password indicates that the field should be included.

if (!user || !(await user.correctPassword(password, user.password))) {
  return next(errorHandler(401, 'incorrect email and password'))
}

const token = signInToken(user._id)
res.status(200).json({
  status: 'success',

  token,
  data:{
    user
  }
})
  }catch(err){
    console.log(err)
  }
  

}


export const googleAuth=async(req,res,next)=>{
try{
const user=await User.findOne({email:req.body.email})
if(user){
const token=signInToken(user._id)
const{password:pass,...rest}=user._doc
res.cookie('access_token',token,{httpOnly:true}).status(200).json({
  token,
  status:'success',
  data:rest
})

}else{
const passwordGenrate =
  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  const user = await User.create({
    email: req.body.email,
    password: passwordGenrate,
    confirmPassword:passwordGenrate,
    username:req.body.username.toLowerCase().split(' ').join('') +
      Math.random().toString(36).slice(-4),
      photo:req.body.photo
  })
let token=signInToken(user._id)
const { password: pass, ...rest } = user._doc
  res.cookie('access_token', token, { httpOnly: true }).status(200).json({
    status: 'success',
    token,
    data: rest,
  })
}

}
catch(err){
  next(err)
}
}



export const updateUser=async(req,res,next)=>{
try{
  let newUser=await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })
  if(!newUser){
    return next(errorHandler(404,'user not found'))
  }
  res.status(200).json({
    status:'success',
    data:{
      user:newUser
    }
  })

}catch(err){
next(errorHandler(401,'not able to update'))
}

}


export const getAllUsers=async(req,res,next) =>{
  try{
    let users=await User.find()
    res.status(200).json({
      status:'success',
      data:{
        users
      }
    })
  }catch(err){
    next(errorHandler(404,'user not fount'))
  }
}