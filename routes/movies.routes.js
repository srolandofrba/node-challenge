import { Router } from 'express'
import {
    getMovies,
    createMovies,
    updateMovies,
    deleteMovies,
    deleteAllMovies
} from '../controllers/movies.controller.js'

const router = Router()

//Routes
router.get('/movies', getMovies)
router.post('/movies', createMovies)
router.put('/movies/:id', updateMovies)
router.delete('/movies/:id', deleteMovies)
router.delete('/movies', deleteAllMovies)



export default router

