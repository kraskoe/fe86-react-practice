import React from 'react';
import './App.css';
import {ThemeState} from './context/themeState';
import {Layout} from './containers/layout';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {NotFoundPage} from './pages/notFoundPage';
import {BlogPage} from './pages/blogPage';
import {PopularPage} from './pages/popularPage';
import {FavoritesPage} from './pages/favouritesPage';
import {SinglePage} from './pages/singlePage';
import store from './store';
import {Provider} from 'react-redux';

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				{/*<Global />*/}
				<ThemeState>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Navigate replace to='posts/1' />} />
							{/*<Route index element={<BlogPage />} />*/}
							<Route path='favourites' element={<PopularPage />} />
							<Route path='popular' element={<FavoritesPage />} />
							<Route path='post/:id' element={<SinglePage />} />
							<Route path='posts/:page' element={<BlogPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Route>
					</Routes>
			</ThemeState>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
