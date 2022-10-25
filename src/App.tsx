import React from 'react';
import './App.css';
import {ThemeState} from './context/themeState';
import {Layout} from './containers/layout';
import {WidthContainer} from './containers/widthContainer/style';
import { MainArea} from './pages/mainPage';
import {Route, Routes} from 'react-router-dom';
import {MainWrapper} from './containers/mainWrapper';
import {NotFoundPage} from './pages/notFoundPage';
import {BlogPage} from './pages/blogPage';
import {PopularPage} from './pages/popularPage';
import {FavoritesPage} from './pages/favouritesPage';
import { StyledMainArea } from './pages/mainPage/style';

function App() {

	return (
		<>
			{/*<Global />*/}
			<ThemeState>
				<Layout>
					<MainWrapper>
						<WidthContainer>
							<MainArea>
								<Routes>
									<Route index element={<BlogPage />} />
									<Route path='favourites' element={<PopularPage />} />
									<Route path='popular' element={<FavoritesPage />} />
									<Route path='*' element={<NotFoundPage />} />
								</Routes>
							</MainArea>
						</WidthContainer>
					</MainWrapper>
				</Layout>
			</ThemeState>
		</>
	);
}

export default App;
