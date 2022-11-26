import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PostProps, PostsState, UserPostsState} from './types';
import {fetchWithAuth} from '../../../api/fetchWithAuth';
import {AppDispatch} from '../../index';

export const fetchUserPosts = createAsyncThunk<PostProps[], null, {rejectValue: string}>(
	'userPosts/fetchUserPosts',
	async function (_, thunkApi) {
		const dispatch = thunkApi.dispatch as AppDispatch;
		const response = await fetchWithAuth('https://studapi.teachmeskills.by/blog/posts/my_posts/', {}, dispatch);

		if (!response.ok) {
			return thunkApi.rejectWithValue(await response.json());
		}

		return await response.json();
	}
)

const initialState: UserPostsState = {
	posts: null,
	status: 'idle',
	error: null,
}

const userPostsSlice = createSlice({
	name: 'userPosts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserPosts.pending, (state) => {
			state.status = 'pending';
			state.posts = null;
			state.error = null;
		});
		builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.posts = action.payload;
			state.error = null;
		});
		builder.addCase(fetchUserPosts.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.error?.message ? action.error?.message : 'Fetching posts error';
		})
	},
})

export default userPostsSlice.reducer;