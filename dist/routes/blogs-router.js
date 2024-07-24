"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = __importDefault(require("express"));
const BlogsRepository_1 = require("../repositories/BlogsRepository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const getBlogViewModel = (dbBlog) => {
    return {
        id: dbBlog.id,
        name: dbBlog.name,
        description: dbBlog.description,
        websiteUrl: dbBlog.websiteUrl,
    };
};
const nameValidation = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 });
const descriptionValidation = (0, express_validator_1.body)('description')
    .trim()
    .isLength({ min: 1, max: 500 });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isURL();
exports.blogsRouter = express_1.default.Router();
exports.blogsRouter.get('/', (req, res) => {
    const blogs = BlogsRepository_1.blogsRepository.findBlogs(req.query.name);
    res.json(blogs.map(getBlogViewModel));
});
exports.blogsRouter.get('/:id', (req, res) => {
    const blogs = BlogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (!blogs) {
        res.sendStatus(404);
        return;
    }
    res.json(getBlogViewModel(blogs));
});
exports.blogsRouter.post('/', nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        const blogs = BlogsRepository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
        res.status(201).send(blogs);
    }
    res.send({ errors: result.array() });
});
exports.blogsRouter.put('/:id', nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        const isUpdated = BlogsRepository_1.blogsRepository.updateProduct(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
        if (isUpdated) {
            const blog = BlogsRepository_1.blogsRepository.findBlog(req.params.id);
            res.send(blog);
        }
        else {
            res.send(404);
        }
    }
    res.send({ errors: result.array() });
});
exports.blogsRouter.delete('/:id', (req, res) => {
    const isDeleted = BlogsRepository_1.blogsRepository.deleteProduct(req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
