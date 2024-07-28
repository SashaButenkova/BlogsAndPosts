import express, { Request, Response, Express, response, Router } from 'express'
import {
	BlogType,
	DBBlogType,
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

blogsRouter.get(
	'/',
	(req: RequestWithQuery<QueryBlogModel>, res: Response<BlogViewModel[]>) => {
		const blogs = blogsRepository.findBlogs(req.query.name)

		res.json(blogs.map(getBlogViewModel))
	}
)

blogsRouter.get(
	'/:id',
	(
		req: RequestWithParams<URIParamsBlogsModel>,
		res: Response<BlogViewModel>
	) => {
		const blogs = blogsRepository.findBlog(req.params.id)
		if (!blogs) {
			res.sendStatus(404)
			return
		}
		res.json(getBlogViewModel(blogs))
	}
)

blogsRouter.post(
	'/',
	BlogValidation,
	(req: RequestWithBody<CreateNewBlogModel>, res) => {
		const result = validationResult(req)
		if (result.isEmpty()) {
			const blogs = blogsRepository.createBlog(
				req.body.name,
				req.body.description,
				req.body.websiteUrl
			)
			res.status(201).send(blogs)
		}
		res.send({ errors: result.array() })
		return
	}
)
blogsRouter.put(
	'/:id',
	BlogValidation,
	(
		req: RequestWithParamsAndBody<URIParamsBlogsModel, UpdateBlogModel>,
		res
	) => {
		const result = validationResult(req)

		if (result.isEmpty()) {
			const isUpdated = blogsRepository.updateProduct(
				req.params.id,
				req.body.name,
				req.body.description,
				req.body.websiteUrl
			)

			if (isUpdated) {
				const blog = blogsRepository.findBlog(req.params.id)
				res.send(blog)
			} else {
				res.send(404)
				return
			}
		}
		res.send({ errors: result.array() })
		return
	}
)

blogsRouter.delete(
	'/:id',
	(req: RequestWithParams<URIParamsBlogsModel>, res) => {
		const isDeleted = blogsRepository.deleteProduct(req.params.id)
		if (isDeleted) {
			res.send(204)
		} else {
			res.send(404)
			return
		}
	}
)
