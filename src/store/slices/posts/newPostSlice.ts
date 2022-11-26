import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {INewPostError, PostProps} from './types';
import {fetchWithAuth} from '../../../api/fetchWithAuth';
import {AppDispatch} from '../../index';

export const createNewPost = createAsyncThunk<PostProps, FormData, {rejectValue: INewPostError}>(
	'posts/newPost',
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

interface IInitialState {
	post: PostProps | null,
	error: INewPostError | string | null,
}

const initialState: IInitialState = {
	post: null,
	error: null,
}

const newPostSlice = createSlice({
	name: 'newPost',
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
	},
})

export default newPostSlice.reducer;