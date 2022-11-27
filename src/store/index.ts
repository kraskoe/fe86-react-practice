import {configureStore} from '@reduxjs/toolkit';
import {jwtRefreshMiddleware} from './middleware';
import authReducer from './slices/auth/authSlice'
import burgerReducer from './slices/burger/burgerSlice';
import postsReducer from './slices/posts/postsSlice';
import postReducer from './slices/posts/postSlice';
import allPostsReducer from './slices/posts/allPostsSlice';
import searchReducer from './slices/search/searchSlice';
import favouritesReducer from './slices/favourites/favouritesSlice';
import userPostReducer from './slices/posts/userPostSlice';
import userPostsReducer from './slices/posts/userPostsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		burger: burgerReducer,
		posts: postsReducer,
		userPosts: userPostsReducer,
		post: postReducer,
		allPosts: allPostsReducer,
		search: searchReducer,
		favourites: favouritesReducer,
		newPost: userPostReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jwtRefreshMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;