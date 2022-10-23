import Movie from '../models/movie.model.js'
import Director from '../models/director.model.js'


export const getMovies = async (req, res) => { 
    try {
        const movies = await Movie.find()
        res.json(movies)    
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const createMovies = async (req, res) => { 
  
    try {
        const {name, director} = req.body
        
        const movie = new Movie({
            name,
            director
        })
    

        //Saving Director
        const newDirector = await Director.findOneAndUpdate({name: director},{name: director}, {
            new: true,
            upsert: true
        })

        const addMoviesToDirector = await Director.find({name: director}, {movies: 1})        
        console.log(addMoviesToDirector.concat())

        //await movie.save()
        return res.json(movie)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateMovies = async (req, res) => {
    try {
        const {id} = req.params

        const movieUpdate = await Movie.findByIdAndUpdate(id, req.body, {
            new: true
        })
        
        res.json(movieUpdate)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteMovies = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)

        if (!movie) return res.status(404).json({
            message: 'movie does not exists'
        })
    
        return res.send(movie)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }



}