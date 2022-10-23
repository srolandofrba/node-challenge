import { Router } from 'express'
import {
    getdirectors,
    createdirectors
} from '../controllers/directors.controller.js'

const router = Router()

//Routes
router.get('/directors', getdirectors)

router.post('/directors', createdirectors)



export default router

