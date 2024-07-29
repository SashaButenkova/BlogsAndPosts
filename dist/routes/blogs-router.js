"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = __importDefault(require("express"));
const BlogsRepository_1 = require("../repositories/BlogsRepository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const getBlogViewModel = (dbBlog) => {
    return {
        id: dbBlog.id,
        name: dbBlog.name,
        description: dbBlog.description,
        websiteUrl: dbBlog.websiteUrl,
    };
};
// const nameValidation = body('name').trim().isLength({ min: 1, max: 15 })
// const descriptionValidation = body('description')
// 	.trim()
// 	.isLength({ min: 1, max: 500 })
// const websiteUrlValidation = body('websiteUrl').trim().isURL()
exports.blogsRouter = express_1.default.Router({});
exports.blogsRouter.get('/', async (req, res) => {
    const getBlogs = await BlogsRepository_1.blogsRepository.findBlogs();
    res.send(getBlogs);
});
exports.blogsRouter.get('/:id', async (req, res) => {
    let foundedBlogById = await BlogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (!foundedBlogById) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(foundedBlogById);
    }
});
exports.blogsRouter.post('/', (0, input_validation_middleware_1.BlogValidation)(), async (req, res) => {
    let createNewBlog = await BlogsRepository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(createNewBlog);
});
exports.blogsRouter.put('/:id', (0, input_validation_middleware_1.BlogValidation)(), async (req, res) => {
    const blog = await BlogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (!blog) {
        return res.sendStatus(404);
    }
    await BlogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    res.sendStatus(204);
});
exports.blogsRouter.delete('/:id', async (req, res) => {
    const blog = await BlogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    await BlogsRepository_1.blogsRepository.deleteBlog(req.params.id);
    res.sendStatus(204);
});
