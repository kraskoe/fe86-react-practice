import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {INewPostError, PostProps} from './types';

interface ICreateNewPostProps {
	formData: FormData,
	access: string,
}

export const createNewPost = createAsyncThunk<PostProps, ICreateNewPostProps, {rejectValue: INewPostError}>(
	'posts/newPost',
	async function ({formData, access}, {rejectWithValue}) {
		const response = await fetch('https://studapi.teachmeskills.by/blog/posts/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer ' + access,
					'accept': 'application/json',
				},
				body: formData,
			}
			);

		if (!response.ok) {
			return rejectWithValue((await response.json()));
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