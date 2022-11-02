import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PostProps} from './postsSlice';

export const fetchPost = createAsyncThunk<PostProps, string, {rejectValue: string}>(
	'posts/fetchPost',
	async function (id, {rejectWithValue}) {
		const response = await fetch(id && `https://studapi.teachmeskills.by/blog/posts/${id}/`);

		if (!response.ok) {
			return rejectWithValue('Server Error');
		}

		const data = await response.json();

		return data;
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
		builder.addCase(fetchPost.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		}),
			builder.addCase(fetchPost.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.post = action.payload;
			})
	},
})

export default postSlice.reducer;