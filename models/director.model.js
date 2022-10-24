import mongoose, { Schema } from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    tvshows: [{
        type: Schema.Types.ObjectId,
        ref: 'Tvshow'
    }]
}, {
    timestamps: true
})

export default mongoose.model('Director', productSchema)