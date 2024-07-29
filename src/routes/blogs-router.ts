import express, { Request, Response, Express, response, Router } from 'express'
import {
	BlogType,
	blogsDb,
	blogsRepository,
} from '../repositories/BlogsRepository'
import { BlogViewModel } from '../models/BlogViewModel'
import {
	RequestWithBody,
	RequestWithParams,
	RequestWithParamsAndBody,
	RequestWithQuery,
} from '../types/types'
import { QueryBlogModel } from '../models/QueryBlogModel'
import { body, validationResult } from 'express-validator'
import { URIParamsBlogsModel } from '../models/URIParamsBlogsIdModel'
import { CreateNewBlogModel } from '../models/CreateNewBlogModel'
//import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { UpdateBlogModel } from '../models/UpdateBlogModel'
import { BlogValidation } from '../middlewares/input-validation-middleware'

const getBlogViewModel = (dbBlog: BlogType): BlogViewModel => {
	return {
		id: dbBlog.id,
		name: dbBlog.name,
		description: dbBlog.description,
		websiteUrl: dbBlog.websiteUrl,
	}
}

// const nameValidation = body('name').trim().isLength({ min: 1, max: 15 })
// const descriptionValidation = body('description')
// 	.trim()
// 	.isLength({ min: 1, max: 500 })
// const websiteUrlValidation = body('websiteUrl').trim().isURL()

export const blogsRouter = express.Router({})

type errorMessageType = {
	field: string
	message: string
}

blogsRouter.get('/', async (req: Request, res: Response) => {
	const getBlogs = await blogsRepository.findBlogs()
	res.send(getBlogs)
})

blogsRouter.get(
	'/:id',
	async (
		req: RequestWithParams<URIParamsBlogsModel>,
		res: Response<BlogViewModel>
	) => {
		let foundedBlogById = await blogsRepository.findBlog(req.params.id)

		if (!foundedBlogById) {
			res.sendStatus(404)
		} else {
			res.status(200).send(foundedBlogById)
		}
	}
)

blogsRouter.post(
	'/',
	BlogValidation(),
	async (req: RequestWithBody<CreateNewBlogModel>, res: Response) => {
		let createNewBlog = await blogsRepository.createBlog(
			req.body.name,
			req.body.description,
			req.body.websiteUrl
		)
		res.status(201).send(createNewBlog)
	}
)
blogsRouter.put(
	'/:id',
	BlogValidation(),
	async (
		req: RequestWithParamsAndBody<URIParamsBlogsModel, UpdateBlogModel>,
		res: Response
	) => {
		const blog = await blogsRepository.findBlog(req.params.id)

		if (!blog) {
			return res.sendStatus(404)
		}

		await blogsRepository.updateBlog(
			req.params.id,
			req.body.name,
			req.body.description,
			req.body.websiteUrl
		)

		res.sendStatus(204)
	}
)

blogsRouter.delete(
	'/:id',
	async (req: RequestWithParams<URIParamsBlogsModel>, res) => {
		const blog = await blogsRepository.findBlog(req.params.id)

		if (!blog) {
			res.sendStatus(404)
			return
		}
		await blogsRepository.deleteBlog(req.params.id)
		res.sendStatus(204)
	}
)
