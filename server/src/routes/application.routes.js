import express from 'express'
import { viewApplication } from '../controllers/Applications/viewApplication.controllers.js'
import { applicationStatus } from '../controllers/Applications/applicationStatus.controllers.js'

const router = express.Router()

router.get('/:jobId/all-applications', viewApplication)
router.get('/:id', applicationStatus)

export default router