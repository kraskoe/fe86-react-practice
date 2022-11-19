import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice'
import burgerReducer from './slices/burger/burgerSlice';
import postsReducer from './slices/posts/postsSlice';
import postReducer from './slices/posts/postSlice';
import allPostsReducer from './slices/posts/allPostsSlice';
import searchReducer from './slices/search/searchSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		burger: burgerReducer,
		posts: postsReducer,
		post: postReducer,
		allPosts: allPostsReducer,
		search: searchReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;