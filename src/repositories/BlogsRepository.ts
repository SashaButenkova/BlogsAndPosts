export type BlogType = {
	id: string
	name: string
	description: string
	websiteUrl: string
}

export const blogsDb: { blogs: BlogType[] } = {
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
}

export type DBBlogType = {
	blogs: BlogType[]
}

export const blogsRepository = {
	findBlog(id: string) {
		const a = blogsDb.blogs.find(v => v.id === id)
		return a
	},

	findBlogs(name?: string) {
		return name
			? blogsDb.blogs.filter(v => v.name.indexOf(name) > -1)
			: blogsDb.blogs
	},

	createBlog(name: string, description: string, websiteUrl: string) {
		const newBlog = {
			id: crypto.randomUUID(),
			name: name,
			description: description,
			websiteUrl: websiteUrl,
		}

		blogsDb.blogs.push(newBlog)
		return newBlog
	},

	updateProduct(
		id: string,
		name: string,
		description: string,
		websiteUrl: string
	) {
		let blog = blogsDb.blogs.find(b => b.id === id)

		if (blog) {
			;(blog.name = name),
				(blog.description = description),
				(blog.websiteUrl = websiteUrl)
			return true
		}
		return false
	},

	deleteProduct(id: string) {
		for (let i = 0; i < blogsDb.blogs.length; i++) {
			if (blogsDb.blogs[i].id === id) {
				blogsDb.blogs.splice(i, 1)
				return true
			}
			return false
		}
	},
}
