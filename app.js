import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import indexRoutes from './routes/index.routes.js'
import moviesRoutes from './routes/movies.routes.js'
import tvshowsRoutes from './routes/tvshows.routes.js'
import directorsRoutes from './routes/directors.routes.js'


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(moviesRoutes)
app.use(tvshowsRoutes)
app.use(directorsRoutes)



export default app