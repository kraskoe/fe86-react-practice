import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import burgerReducer from './burgerSlice';
import postsReducer from './postsSlice';
import postReducer from './postSlice';
import allPostsReducer from './allPostsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		burger: burgerReducer,
		posts: postsReducer,
		post: postReducer,
		allPosts: allPostsReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;