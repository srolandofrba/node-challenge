import { Router } from 'express'
import {
    gettvshows,
    createtvshows
} from '../controllers/tvshows.controller.js'

const router = Router()

//Routes
router.get('/tvshows', gettvshows)

router.post('/tvshows', createtvshows)



export default router

