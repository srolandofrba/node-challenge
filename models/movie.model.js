import mongoose from 'mongoose'

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Movie', movieSchema)