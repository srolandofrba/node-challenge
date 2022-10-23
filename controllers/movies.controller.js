import Movie from '../models/movie.model.js'
import Director from '../models/director.model.js'

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const getMovies = async (req, res) => { 

    //Pass query with the format { filter: {}, sort: {} }
    //For example: movies?filter[director]=Yo&sort[name]=1
    try {
        if (!isEmpty(req.query)) {
            const { filter, sort } = req.query
            const movies = await Movie.find(filter).sort(sort)
            return res.json(movies)    
        } else {
            const movies = await Movie.find()
            return res.json(movies)    
        }
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

        await movie.save()
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

export const deleteAllMovies = async (req, res) => {
    try {
        const deleteAll = await Movie.deleteMany()
        return res.json(deleteAll)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        
        })
    }
}