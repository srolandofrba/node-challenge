import Tvshow from '../models/tvshow.model.js'
import Director from '../models/director.model.js'

//Endpoint for retrieving the information (director included) of a specific episode of a TV Show
export const gettvshows = async (req, res) => { 
     try {
        const tvshows = await Tvshow.find().populate({path: 'director', select: 'name'})
        return res.json(tvshows)    
    }
     catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}






///////////////////////////////
export const addTvshow = async (req, res) => { 
  
    try {
        const {name, director, seasons, episodes} = req.body
        const tvshow = new Tvshow({
            name,
            seasons,
            episodes
        })
        
        //Saving Director
        const newDirector = await Director.findOneAndUpdate({name: director},{name: director}, {
            new: true,
            upsert: true
        })
        
        //Update tvshows for director
        const updatetvshows = newDirector.tvshows.concat(tvshow._id)
        const addtvshowToDirector = await Director.findOneAndUpdate({name: director}, {tvshows: updatetvshows}, {
            new: true,
            upsert: true
        })
        
        //Update director in tvshow
        tvshow.director = addtvshowToDirector._id
        await tvshow.save()
        return res.json(tvshow)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const deleteAlltvShows = async (req, res) => {
    try {
        const deleteAll = await Tvshow.deleteMany()
        return res.json(deleteAll)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}