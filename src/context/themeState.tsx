import {lightTheme, darkTheme} from '../styles/theme';
import {createContext, ReactNode, useState} from 'react';
import {ThemeProvider} from 'styled-components';

type ThemeContextProps = {
	children?: ReactNode,
}

export const MainThemeContext = createContext(() => {return});

export const ThemeState = ({children}: ThemeContextProps) => {
	const [mainTheme, setTheme] = useState('light');

	function toggleTheme()  {
		mainTheme === 'light' ? setTheme('dark') : setTheme('light');
	}

	return (
		<MainThemeContext.Provider value={() => toggleTheme()}>
			<ThemeProvider theme={mainTheme === 'light' ? lightTheme : darkTheme}>
				{children}
			</ThemeProvider>
		</MainThemeContext.Provider>
	)
}