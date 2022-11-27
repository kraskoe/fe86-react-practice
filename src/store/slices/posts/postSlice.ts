import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PostProps} from './types';

export const fetchPost = createAsyncThunk<PostProps, string, {rejectValue: string}>(
	'posts/fetchPost',
	async function (id, {rejectWithValue}) {
		const response = await fetch(id && `https://studapi.teachmeskills.by/blog/posts/${id}/`);

		if (!response.ok) {
			return rejectWithValue(await response.json());
		}

		return await response.json();
	}
);

interface PostState {
	post: PostProps | null,
	status: 'idle' | 'pending' | 'succeeded' | 'failed',
	error: string | null,
}

const initialState: PostState = {
	post: null,
	status: 'idle',
	error: null,
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.post = action.payload;
		});
		builder.addCase(fetchPost.rejected, (state, action) => {
			state.status = 'failed';
			state.post = null;
			state.error = action.error.message || 'Server error';
		});
	},
})

export default postSlice.reducer;