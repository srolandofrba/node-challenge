import mongoose,  { Schema } from 'mongoose'

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director'
    },
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    genre: {
        type: String,
        required: true,
        trim: true
    }
},
    { 
    timestamps: true
})

export default mongoose.model('Movie', movieSchema)