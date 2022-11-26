export interface PostProps {
	id: number,
	author: number,
	lesson_num: number,
	text: string,
	title: string,
	image: string,
	date: string,
}

export interface PostsData {
	count: number,
	next: string | null,
	previous: string | null,
	results: Array<PostProps>,
}

export interface PostsState {
	posts: PostsData | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

export interface UserPostsState {
	posts: PostProps[] | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

export interface INewPostError {
	title?: string,
	text?: string
	image?: string,
}

export interface IFetchPostsProps {
	page?: string,
	ordering?: string,
	limit?: string,
	search?: string,
	offset?: boolean,
}
