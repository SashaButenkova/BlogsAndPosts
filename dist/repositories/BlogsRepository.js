"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogsDb = void 0;
exports.blogsDb = [
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
];
// export type DBBlogType = {
// 	blogs: BlogType[]
// }
exports.blogsRepository = {
    async findBlog(id) {
        return exports.blogsDb.find(b => b.id === id);
    },
    async findBlogs() {
        return exports.blogsDb;
    },
    async createBlog(name, description, websiteUrl) {
        const id = new Date();
        let newBlog = {
            id: id.toISOString(),
            name,
            description,
            websiteUrl,
        };
        exports.blogsDb.push(newBlog);
        return newBlog;
    },
    async updateBlog(id, name, description, websiteUrl) {
        let blog = exports.blogsDb.find(b => b.id === id);
        if (blog) {
            ;
            (blog.name = name),
                (blog.description = description),
                (blog.websiteUrl = websiteUrl);
        }
        const foundBlog = {
            id: id,
            name,
            description,
            websiteUrl,
        };
        const indexBlog = exports.blogsDb.findIndex(b => b.id === id);
        exports.blogsDb.splice(indexBlog, 1, foundBlog);
        return;
    },
    async deleteBlog(id) {
        const indexBlog = exports.blogsDb.findIndex(b => b.id === id);
        exports.blogsDb.splice(indexBlog, 1);
        return;
    },
};
