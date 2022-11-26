import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IFetchPostsProps, PostsData, PostsState} from './types';


export const fetchPosts = createAsyncThunk<PostsData, object & IFetchPostsProps, {rejectValue: string}>(
	'posts/fetchPosts',
	async function ({page, ordering, limit,search, offset}, {rejectWithValue}) {
			const orderingQuery = `&ordering=${ordering}`;
			const limitQuery = `&limit=${limit || '10'}`;
			const searchQuery = `&search=${search}`;
			const offsetQuery = `&offset=${Number(limit) * (Number(page)-1)}`;
			const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/?${limit ? limitQuery : ''}${search ? searchQuery : ''}${offset ? offsetQuery : ''}${ordering ? orderingQuery : ''}`);

			if (!response.ok) {
				return rejectWithValue('Server Error');
			}

			const data = await response.json();

			return data;
	}
);

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
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.posts = action.payload;
		});
		// builder.addCase(fetchPosts.rejected, (state, action) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// })
	},
})

export default postsSlice.reducer;