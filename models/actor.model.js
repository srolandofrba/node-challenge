import mongoose, {Schema} from 'mongoose'

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
    tvShows: [{
        type: Schema.Types.ObjectId,
        ref: 'tvshow'
    }]
}, {
    timestamps: true
})

export default mongoose.model('Actor', productSchema)