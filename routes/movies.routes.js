import { Router } from 'express'
import {
    getMovies,
    createMovies,
    updateMovies,
    deleteMovies
} from '../controllers/movies.controller.js'

const router = Router()

//Routes
router.get('/movies', getMovies)

router.post('/movies', createMovies)

router.put('/movies/:id', updateMovies)

router.delete('/movies/:id', deleteMovies)



export default router

