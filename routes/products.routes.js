import { Router } from 'express'
import {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    getProduct
} from '../controllers/products.controller.js'

const router = Router()

//Routes
router.get('/products', getProducts)

router.post('/products', createProducts)

router.put('/products/:id', updateProducts)

router.delete('/products/:id', deleteProducts)

router.get('/products/:id', getProduct)

export default router

