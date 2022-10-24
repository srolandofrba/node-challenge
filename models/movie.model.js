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
    }
}, {
    timestamps: true
})

export default mongoose.model('Movie', movieSchema)