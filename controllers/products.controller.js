import Product from '../models/product.model.js'

export const getProducts = async (req, res) => { 
    try {
        const products = await Product.find()
        res.json(products)    
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

export const getProduct = async (req, res) => { 
    try {
        const product = await Product.findById(req.params.id)

        if (!product) return res.status(404).json({
            message: 'Product does not exists'
        })
    
        return res.json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }


}


export const createProducts = async (req, res) => {
    try {
        const {_id, name, description, price} = req.body
    
        const checkName = await Product.find({name: name})
        
        if (!checkName) {
            const product = new Product({
                name,
                description,
                price
            })
        
            await product.save()
        
            res.json(product)
        } else {
            res.status(404).json({
                message: 'Product already exists. Try with another name'
            })
        }
    
        res.json('createProducts')
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }



}

export const updateProducts = async (req, res) => {
    try {
        const {id} = req.params

        const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        
        res.json(productUpdate)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) return res.status(404).json({
            message: 'Product does not exists'
        })
    
        return res.send(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }



}