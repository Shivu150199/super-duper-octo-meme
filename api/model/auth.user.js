import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
console.log(mongoose.Model)
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide valid username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  photo: {
    type:String,
    default:'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    require: [true, 'please write correct passsword'],
    validate: {
      validator: function (e) {
        return e === this.password
      },
    },
    message: 'password is not correct',
  },
})


userSchema.methods.correctPassword=async function (candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.pre('save',async function(next){
if(!this.isModified('password')) return next();
this.password=await bcrypt.hash(this.password,12)
this.confirmPassword=undefined;
})




const User = mongoose.model('User', userSchema)
export default User
