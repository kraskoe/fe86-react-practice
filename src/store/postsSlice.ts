import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk<PostsData, number, {rejectValue: string}>(
	'posts/fetchPosts',
	async function (page, {rejectWithValue}) {
			const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/?limit=10&offset=${199 - 10 * page}&ordering=date`);

			if (!response.ok) {
				return rejectWithValue('Server Error');
			}

			const data = await response.json();

			const sortedData = {
				...data,
				results : data.results.reverse(),
			}

			return sortedData;
	}
);

export interface PostProps {
	id: number,
	author: number,
	lesson_num: number,
	text: string,
	title: string,
	image: string,
	date: string,
}

interface PostsData {
	count: number,
	next: string | null,
	previous: string | null,
	results: Array<PostProps>,
}

interface PostsState {
	posts: PostsData | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

const initialState: PostsState = {
	posts: null,
	status: 'idle',
	error: null,
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		}),
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.posts = action.payload;
		})
		// builder.addCase(fetchPosts.rejected, (state, action) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// })
	},
})

export default postsSlice.reducer;