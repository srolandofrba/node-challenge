import Tvshow from '../models/tvshow.model.js'

export const gettvshows = async (req, res) => { 
    try {
        const tvshows = await Tvshow.find()
        res.json(tvshows)    
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const createtvshows = async (req, res) => { 
  
    try {
        const {name} = req.body
        
        const tvshow = new Tvshow({
            name
        })
    
        await tvshow.save()
        return res.json(tvshow)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}