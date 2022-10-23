import { Router } from 'express'

const router = Router()

//Routes
router.get('/', (req, res) => {
    res.send('Main')
})

router.get('/login', (req, res) => {
    res.send('Login')
})


export default router

