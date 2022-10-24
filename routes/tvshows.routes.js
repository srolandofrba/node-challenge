import { Router } from 'express'
import {
    gettvshows,
    addTvshow,
    deleteAlltvShows
} from '../controllers/tvshows.controller.js'

const router = Router()

//Routes
router.get('/tvshows', gettvshows)

router.post('/tvshows', addTvshow)
router.delete('/tvshows', deleteAlltvShows)



export default router

