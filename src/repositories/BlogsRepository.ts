export type BlogType = {
	id: string
	name: string
	description: string
	websiteUrl: string
}

export const blogsDb: BlogType[] = [
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
]

// export type DBBlogType = {
// 	blogs: BlogType[]
// }

export const blogsRepository = {
	async findBlog(id: string): Promise<BlogType | undefined> {
		return blogsDb.find(b => b.id === id)
	},

	async findBlogs(): Promise<BlogType[]> {
		return blogsDb
	},

	async createBlog(
		name: string,
		description: string,
		websiteUrl: string
	): Promise<BlogType> {
		const id = new Date()
		let newBlog = {
			id: id.toISOString(),
			name,
			description,
			websiteUrl,
		}

		blogsDb.push(newBlog)
		return newBlog
	},

	async updateBlog(
		id: string,
		name: string,
		description: string,
		websiteUrl: string
	): Promise<BlogType | undefined> {
		let blog = blogsDb.find(b => b.id === id)

		if (blog) {
			;(blog.name = name),
				(blog.description = description),
				(blog.websiteUrl = websiteUrl)
		}
		const foundBlog = {
			id: id,
			name,
			description,
			websiteUrl,
		}

		const indexBlog: number = blogsDb.findIndex(b => b.id === id)

		blogsDb.splice(indexBlog, 1, foundBlog)
		return
	},

	async deleteBlog(id: string): Promise<BlogType | undefined> {
		const indexBlog = blogsDb.findIndex(b => b.id === id)
		blogsDb.splice(indexBlog, 1)
		return
	},
}
