import React from 'react';
import './App.css';
import {ThemeState} from './context/themeState';
import {Layout} from './containers/layout';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';
import {NotFoundPage} from './pages/notFoundPage';
import {BlogPage} from './pages/blogPage';
import {PopularPage} from './pages/popularPage';
import {FavoritesPage} from './pages/favouritesPage';
import {SinglePage} from './pages/singlePage';
import store from './store';
import {Provider} from 'react-redux';
import {SearchPage} from './pages/searchPage';
import {LoginPage} from './pages/loginPage';
import {RequireAuth} from './containers/requireAuth';
import { SignUpPage } from './pages/signUpPage';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path='/' element={<Layout />}>
		<Route index element={<Navigate replace to='posts/1' />} />
		<Route path='favourites' element={
			<RequireAuth>
				<FavoritesPage />
			</RequireAuth>
		} />
		<Route path='post/:id' element={<SinglePage />} />
		<Route path='posts' element={<Navigate replace to='/posts/1' />} />
		<Route path='posts/:page' element={<BlogPage />} />
		<Route path='popular' element={<Navigate replace to='/popular/1' />} />
		<Route path='popular/:page' element={<PopularPage />} />
		<Route path='search/:page' element={<SearchPage />} />
		<Route path='login' element={<LoginPage />} />
		<Route path='signup' element={<SignUpPage />} />
		<Route path='*' element={<NotFoundPage />} />
	</Route>
))

function App() {
	return (
			<Provider store={store}>
				{/*<Global />*/}
				<ThemeState>
					<RouterProvider router={router} />
				</ThemeState>
			</Provider>
	);
}

export default App;
