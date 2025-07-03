import express from 'express'
import { projectDashboard } from '../controllers/project/projectdashboard.controllers.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
const router = express.Router()
router.get('/project-dashboard/:projectId', authenticateUser, projectDashboard)
export default router