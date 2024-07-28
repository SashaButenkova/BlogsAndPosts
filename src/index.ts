import express, { Request, Response } from 'express'
import { blogsRouter } from './routes/blogs-router'
import { blogsDb } from './repositories/BlogsRepository'

export const app = express()

export const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

app.use('/blogs', blogsRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`app listen on porte ${port}`)
})
