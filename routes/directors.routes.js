import { Router } from 'express'
import {
    getdirectors,
    createdirectors,
    deleteAllDirectors
} from '../controllers/directors.controller.js'

const router = Router()

//Routes
router.get('/directors', getdirectors)
router.post('/directors', createdirectors)
router.delete('/directors', deleteAllDirectors)


export default router

