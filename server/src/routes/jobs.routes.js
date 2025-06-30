import express from 'express'
import { jobPost } from '../controllers/Jobs/jobPost.controllers.js'
import { viewMyJobs } from '../controllers/Jobs/viewMyJobs.controllers.js'
import { applyJob } from '../controllers/Jobs/applyJob.controllers.js'
import { detailedJobs } from '../controllers/Jobs/detailedJobs.controllers.js' 
import { deleteJobs } from '../controllers/Jobs/deleteJob.controllers.js'
import { viewAllJobs } from '../controllers/Jobs/viewAllJobs.controllers.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
import { editJob } from '../controllers/Jobs/editJob.contollers.js'
import { partialEdit } from '../controllers/Jobs/patchJob.controllers.js'

const router = express.Router()

// Post a job
router.post('/', authenticateUser, jobPost)
// Get posted jobs 
router.get('/all-jobs', authenticateUser, viewAllJobs)
// View all my jobs
router.get('/my-jobs', authenticateUser, viewMyJobs)
// Apply for a job
router.post('/:id/apply', authenticateUser, applyJob)
// Get a detailed job view
router.get('/:id', authenticateUser, detailedJobs)
// Delete a job 
router.delete('/:id', authenticateUser, deleteJobs)
// Edit jobs Complete
router.put('/:id/edit', authenticateUser, editJob)
// Partial job edit
router.patch('/:id/patch', authenticateUser, partialEdit)

export default router