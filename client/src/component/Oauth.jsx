import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'

import { useDispatch, useSelector } from 'react-redux'

import { googleAuthentication } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const Oauth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, loading } = useSelector((state) => state.userState)
  const handleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)

      dispatch(
        googleAuthentication({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      ).then(() => {
        navigate('/alljob')
        toast('sign up successfull')
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAuth}
        className="btn mt-5 w-[20rem] bg-rose-700 text-white"
      >
        {loading ? 'loading...' : 'Google authentication'}
      </button>
    </div>
  )
}

export default Oauth
