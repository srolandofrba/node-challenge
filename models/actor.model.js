import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    movies: [
        {
            movieName: {
                type: String
            }
        }
    ],
    tvShows: [
        {
            tvShowName: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model('Actor', productSchema)