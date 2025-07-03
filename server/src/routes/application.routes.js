import express from 'express'
import { viewApplication } from '../controllers/Applications/viewApplication.controllers.js'
import { applicationStatus } from '../controllers/Applications/allApplicationStatus.controllers.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
import { viewApplicationAndStatus } from '../controllers/Applications/viewApplicationAndStatus.controllers.js'
import { acceptApplication } from '../controllers/Applications/acceptApplication.controllers.js'
import { declineApplication } from '../controllers/Applications/declineApplication.controllers.js'

const router = express.Router()

router.get('/:jobId/all-applications', authenticateUser, viewApplication)
router.get('/:id', authenticateUser, applicationStatus)
router.get('/status/:applicationId', authenticateUser, viewApplicationAndStatus)
router.get('/acceptStatus/:applicationId', authenticateUser, acceptApplication)
router.get('/declineApplication/:applicationId', authenticateUser, declineApplication)

export default router