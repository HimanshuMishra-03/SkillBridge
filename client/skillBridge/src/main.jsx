import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Login from './components/Login.jsx'
import RegistrationForm from './components/RegistrationForm.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import { AdminDashboard } from './components/AdminDashboard.jsx'
import { FreelancerDashboard } from './components/FreelancerDashboard.jsx'
import { ClientDashboard } from './components/ClientDashboard.jsx'
import ViewDetailedJobs from './components/pages/ViewDetailedJobs.jsx'
import ApplyJobs from './components/pages/ApplyJobs.jsx'
import EditJobs from './components/pages/EditJobs.jsx'
import ViewApplications from './components/pages/ViewApplications.jsx'
import HomePage from './components/HomePage.jsx'
import GetMyJobs from './components/pages/GetMyJobs.jsx'
import PostJobs from './components/pages/PostJobs.jsx'
import GetAllJobs from './components/pages/GetAllJobs.jsx'

const router = createBrowserRouter(
  // routing happens here 
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/freelancer-dashboard' element={<FreelancerDashboard />} />
      <Route path='/client-dashboard' element={<ClientDashboard />} />
      <Route path='/job-details/:id' element={<ViewDetailedJobs />} />
      <Route path='/job-apply/:id' element={<ApplyJobs />} />
      <Route path='/job-edit/:id' element={<EditJobs />} />
      <Route path='/view-applications/:jobId' element={<ViewApplications />} />
      <Route path='/client/my-jobs' element={<GetMyJobs />} />
      <Route path='/client/post-jobs' element={<PostJobs />} />
      <Route path='/freelancer/all-jobs' element={<GetAllJobs />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

