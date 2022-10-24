import Movie from '../models/movie.model.js'
import Director from '../models/director.model.js'
import Actor from '../models/actor.model.js'

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


//EndPoint for retrieving movies
export const getMovies = async (req, res) => { 

    //Pass query with the format { filter: {}, sort: {} }
    //For example: movies?filter[genre]=Action&sort[name]=1 or ?filter[director]=6356d8a8c4c7c3b5cd317dd3&sort[name]=1
    try {
        if (!isEmpty(req.query)) {
            const { filter, sort } = req.query
            const movies = await Movie.find(filter).sort(sort).populate({path: 'director', select: 'name'}).populate({path: 'actors', select: 'name'})
            return res.json(movies)    
        } else {
            const movies = await Movie.find().populate({path: 'director', select: 'name'}).populate('actors')
            return res.json(movies)    
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


//Endpoint for adding a new object (Movie)
export const addMovie = async (req, res) => { 
  
    try {
        const {name, director, actors, genre} = req.body
        const movie = new Movie({
            name,
            genre
        })
        
        //Saving Director
        const newDirector = await Director.findOneAndUpdate({name: director},{name: director}, {
            new: true,
            upsert: true
        })
        //Update movies for director
        const updateMovies = newDirector.movies.concat(movie._id)
        const addMovieToDirector = await Director.findOneAndUpdate({name: director}, {movies: updateMovies}, {
            new: true,
            upsert: true
        })

        //Saving Actor
        const actorsIds = []
        for (const actor of actors) {
            const newActor = await Actor.findOneAndUpdate({name: actor},{name: actor}, {
                new: true,
                upsert: true
            })

        //Update movies for actor
        const updateMovies = newActor.movies.concat(movie._id)
        
        const addMovieToActor = await Actor.findOneAndUpdate({name: actor}, {movies: updateMovies}, {
            new: true,
            upsert: true
        })
        
         actorsIds.push(addMovieToActor._id)   
        }

        //Update director and actors in movie
        movie.director = addMovieToDirector._id
        movie.actors = actorsIds
        console.log(movie)
        //Save movie in collection
        await movie.save()
        return res.json(movie)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}




//////////////////////////////
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