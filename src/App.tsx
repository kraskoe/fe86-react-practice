import React from 'react';
import './App.css';
import {Header} from './components/header';
import {MainWrapper} from './components/mainWrapper';
import {ThemeState} from './context/themeState';

function App() {
	return (
		<ThemeState>
			<MainWrapper>
				<Header />
				<div>some</div>
			</MainWrapper>
		</ThemeState>
	);
}

export default App;
