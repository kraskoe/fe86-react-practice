import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {INewPostError, PostProps} from './types';
import {fetchWithAuth} from '../../../api/fetchWithAuth';
import {AppDispatch} from '../../index';

interface IUpdatePostProps {
	id: string,
	formData: FormData,
}

export const createNewPost = createAsyncThunk<PostProps, FormData, {rejectValue: INewPostError}>(
	'userPost/newPost',
	async function (formData, thunkApi) {
		const dispatch = thunkApi.dispatch as AppDispatch;
		const response = await fetchWithAuth('https://studapi.teachmeskills.by/blog/posts/',
			{
				method: 'POST',
				body: formData,
			},
			dispatch
			);

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()));
		}

		return await response.json();
	}
);

export const updatePost = createAsyncThunk<PostProps, IUpdatePostProps, {rejectValue: INewPostError}>(
	'userPost/updatePost',
	async function ({id, formData}, thunkApi) {
		const dispatch = thunkApi.dispatch as AppDispatch;
		const response = await fetchWithAuth(`https://studapi.teachmeskills.by/blog/posts/${id}/`,
			{
				method: 'PUT',
				body: formData,
			},
			dispatch
			);

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()));
		}

		return await response.json();
	}
);

export const deletePost = createAsyncThunk<string, number, {rejectValue: INewPostError}>(
	'userPost/delete',
	async function (id, thunkApi) {
		const dispatch = thunkApi.dispatch as AppDispatch;
		const response = await fetchWithAuth(`https://studapi.teachmeskills.by/blog/posts/${id}/`,
			{
				method: 'DELETE',
			},
			dispatch)

		if (response.status !== 204) {
			return thunkApi.rejectWithValue((await response.json()));
		}

		return 'Post deleted';
	}
)

interface IInitialState {
	post: PostProps | null,
	error: INewPostError | string | null,
}

const initialState: IInitialState = {
	post: null,
	error: null,
}

const userPostSlice = createSlice({
	name: 'userPost',
	initialState,
	reducers: {	},
	extraReducers: (builder) => {
		builder.addCase(createNewPost.fulfilled, (state, {payload}) => {
			state.post = payload;
			state.error = null;
		});
		builder.addCase(createNewPost.rejected, (state, action) => {
			state.post = null;
			if (action.payload) {
				state.error = action.payload;
			} else {
				state.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(updatePost.fulfilled, (state, {payload}) => {
			state.post = payload;
			state.error = null;
		});
		builder.addCase(updatePost.rejected, (state, action) => {
			state.post = null;
			if (action.payload) {
				state.error = action.payload;
			} else {
				state.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(deletePost.fulfilled, (state) => {
			state.error = null;
		});
		builder.addCase(deletePost.rejected, (state, action) => {
			state.error = action.error.message ? action.error.message : 'Server error';
		});
	},
})

export default userPostSlice.reducer;