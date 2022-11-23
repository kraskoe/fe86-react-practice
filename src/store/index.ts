import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice'
import burgerReducer from './slices/burger/burgerSlice';
import postsReducer from './slices/posts/postsSlice';
import postReducer from './slices/posts/postSlice';
import allPostsReducer from './slices/posts/allPostsSlice';
import searchReducer from './slices/search/searchSlice';
import favouritesReducer from './slices/favourites/favouritesSlice';
import newPostReducer from './slices/posts/newPostSlice';
import {jwtRefreshMiddleware} from './middleware';

const store = configureStore({
	reducer: {
		auth: authReducer,
		burger: burgerReducer,
		posts: postsReducer,
		post: postReducer,
		allPosts: allPostsReducer,
		search: searchReducer,
		favourites: favouritesReducer,
		newPost: newPostReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jwtRefreshMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;