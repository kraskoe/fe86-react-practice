import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PostProps} from './postsSlice';

export const fetchPopularPosts = createAsyncThunk<Array<PostProps>, undefined, {rejectValue: string}>(
	'posts/fetchPopularPosts',
	async function (_, {rejectWithValue}) {
		const response = await fetch('https://studapi.teachmeskills.by/blog/posts/?limit=200&ordering=lesson_num');

		if (!response.ok) {
			return rejectWithValue('Server Error');
		}

		const data = await response.json();

		const sortedPopularPosts = data.results.reverse();

		return sortedPopularPosts;
	}
);

interface PopularPostsState {
	popularPosts: PostProps[] | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

const initialState: PopularPostsState = {
	popularPosts: null,
	status: 'idle',
	error: null,
}

const popularPostsSlice = createSlice({
	name: 'popularPosts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPopularPosts.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		}),
			builder.addCase(fetchPopularPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.popularPosts = action.payload;
			})
		// builder.addCase(fetchPosts.rejected, (state, action) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// })
	},
})

export default popularPostsSlice.reducer;