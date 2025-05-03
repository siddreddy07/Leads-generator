import express from 'express'
import { addLead, getallLeads } from '../controllers/leads.controller.js'

const router = express.Router()



router.post('/add-leads',addLead)
router.get('/get-leads',getallLeads)

export default router