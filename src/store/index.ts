import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'
import burgerReducer from './burger/burgerSlice';
import postsReducer from './posts/postsSlice';
import postReducer from './posts/postSlice';
import allPostsReducer from './posts/allPostsSlice';
import searchReducer from './search/searchSlice';

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