import mongoose, { Schema } from 'mongoose'

const productSchema = mongoose.Schema({
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
    seasons: {
        type: Number
    },
    episodes: {
        type: Number
    }
}, {
    timestamps: true
})

export default mongoose.model('TvShow', productSchema)