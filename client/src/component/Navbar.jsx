import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearData } from '../redux/userSlice'
import { ToastContainer, toast } from 'react-toastify'


const Navbar = () => {
  const photo=useSelector(state=>state.userState.user.photo)
  // console.log(photo)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
  dispatch(clearData())
  navigate('/landingpage')
  toast('user is logout')
  }
  return (
    <>
      {/*  */}
      
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <h1 className="tracking-wider font-bold text-white flex items-center justify-start gap-4">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
           
                <label
                  htmlFor="my-drawer"
                  className="drawer-button p-2 w-[3rem] h-[3rem] rounded button font-extrabold bg-teal-700 flex items-center justify-center text-3xl"
                >
                  I
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <h1 className="flex gap-4 items-center text-3xl">
                    <span className="drawer-button p-2 w-[3rem] h-[3rem] rounded button font-extrabold bg-teal-700 flex items-center justify-center">
                      I
                    </span>{' '}
                    <span>Vault</span>
                  </h1>
                  <li>
                    <Link to="/addjob">Add Job</Link>
                  </li>
                  <li>
                    <Link to="/alljob">All Job</Link>
                  </li>
                </ul>
              </div>
            </div>
            <span>Vault</span>
          </h1>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={photo} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to='/user/profile' className="justify-between">Profile</Link>
              </li>

              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
