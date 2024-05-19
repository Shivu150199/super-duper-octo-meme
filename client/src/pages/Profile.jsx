import React, { useEffect, useRef, useState } from 'react'
import Input from '../component/Input'
import signups from '../assets/signup.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { handleUpdate, updateUser } from '../redux/userSlice'
const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const fileRef = useRef(null)
  const { data, loading, error,user,profileData } = useSelector((state) => state.userState)
const [formData,setFormData]=useState({})
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)


  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value,photo:'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'})
  }
  console.log(formData)

const uid=user._id
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const upload = uploadBytesResumable(storageRef, file)

    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downlaodUrl) => {
        setFormData({
            ...formData,
            photo:
              downlaodUrl
          })
        })
      }
    )
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  },[file])
  console.log('file perc', filePerc)

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
 dispatch(updateUser({ uid, formData }))
 navigate('/alljob')
    }catch(err){
      console.log(err)
    }
   
  
  }


  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="p-4 flex items-center justify-center ">
        <img src={signups} alt="" className="w-96 hidden md:block" />
      </div>
      <div className="flex items-center justify-center h-full overflow-scroll">
        <form
          className=" p-2 mt-20 rounded flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-center my-4 text-teal-700">
            Update Profile
          </h2>
          <div className='flex items-center justify-center'>
            <img
              onClick={() => fileRef.current.click()}
              src={user.photo}
              alt="profile pic"
              className="rounded cursor-pointer w-[3rem] h-[3rem] object-cover mx-auto"
            />
            <input
              type="file"
              hidden
              accept="image/*"
              ref={fileRef}
              id="photo"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p>{filePerc>0&&filePerc<100?`${filePerc} % uploading`:""}</p>
          </div>

          <Input
            value={user.username}
            id="username"
            type="text"
            placehodler="Username"
            label="Username"
            onChange={handleChange}
          />
          <Input
            value={user.email}
            id="email"
            type="email"
            placehodler="Email"
            label="Email "
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placehodler="Password"
            label="password"
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            type="password"
            placehodler="Confirm Password"
            label="Confirm password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            className="btn mt-5 w-[20rem] capitalize"
          >
            {loading ? 'loading..' : 'update profile'}
          </button>

          <div className="text-red-700 flex items-center justify-center">
            {error ? error.message : ''}
          </div>
          <div className="flex items-center justify-between mt-2 gap-2 w-full">
            <Link to="/login" className="text-xs text-blue-600">
              Delete account
            </Link>
            <Link to="/forgotpassword" className="text-xs text-blue-600">
              Log Out
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile
