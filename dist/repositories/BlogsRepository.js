"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogsDb = void 0;
exports.blogsDb = {
    blogs: [
        {
            id: '1',
            name: 'bla',
            description: 'blaa',
            websiteUrl: 'blaaaaa',
        },
        {
            id: '2',
            name: 'bla',
            description: 'blaa',
            websiteUrl: 'blaaaaa',
        },
    ],
};
exports.blogsRepository = {
    findBlog(id) {
        const a = exports.blogsDb.blogs.find(v => v.id === id);
        return a;
    },
    findBlogs(name) {
        return name
            ? exports.blogsDb.blogs.filter(v => v.name.indexOf(name) > -1)
            : exports.blogsDb.blogs;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: crypto.randomUUID(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
        };
        exports.blogsDb.blogs.push(newBlog);
        return newBlog;
    },
    updateProduct(id, name, description, websiteUrl) {
        let blog = exports.blogsDb.blogs.find(b => b.id === id);
        if (blog) {
            ;
            (blog.name = name),
                (blog.description = description),
                (blog.websiteUrl = websiteUrl);
            return true;
        }
        return false;
    },
    deleteProduct(id) {
        for (let i = 0; i < exports.blogsDb.blogs.length; i++) {
            if (exports.blogsDb.blogs[i].id === id) {
                exports.blogsDb.blogs.splice(i, 1);
                return true;
            }
            return false;
        }
    },
};
