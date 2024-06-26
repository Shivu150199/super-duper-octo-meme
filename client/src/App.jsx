import { Suspense, lazy, useState } from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import AddJob from './pages/AddJob'
import AllJob from './pages/AllJob'
import ProtectedRoute from './pages/ProtectedRoute'

import { ToastContainer } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/Profile'
// import EditJob from './pages/EditJob'
const EditJob=lazy(()=>import('./pages/EditJob'))

function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/landingpage" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="addjob" replace />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="alljob" element={<AllJob />} />
          <Route
            path="alljob/:id"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <EditJob />
              </Suspense>
            }
          />
          <Route path="/user/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
