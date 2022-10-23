import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
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