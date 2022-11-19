import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PostsData} from './postsSlice';

export const fetchAllPosts = createAsyncThunk<PostsData, string | undefined, {rejectValue: string}>(
	'posts/fetchAllPosts',
	async function (ordering, {rejectWithValue}) {
		const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/?limit=500&ordering=${ordering}`);

		if (!response.ok) {
			return rejectWithValue('Server Error');
		}

		const data = await response.json();

		return data;
	}
);

interface AllPostsState {
	allPosts: PostsData | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

const initialState: AllPostsState = {
	allPosts: null,
	status: 'idle',
	error: null,
}

const allPostsSlice = createSlice({
	name: 'allPosts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllPosts.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		});
		builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.allPosts = action.payload;
		});
	},
})

export default allPostsSlice.reducer;