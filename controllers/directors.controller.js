import Director from '../models/director.model.js'

export const getdirectors = async (req, res) => { 
    try {
        const directors = await Director.find().populate({path: 'movies', select: 'name'})
        res.json(directors)    
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const createdirectors = async (req, res) => { 
  
    try {
        const {name} = req.body
        
        const director = new Director({
            name
        })
    
        await director.save()
        return res.json(director)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteAllDirectors = async (req, res) => {
    try {
        const deleteAll = await Director.deleteMany()
        return res.json(deleteAll)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        
        })
    }
}