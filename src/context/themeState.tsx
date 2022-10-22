import {lightTheme, darkTheme} from '../styles/theme';
import {createContext, FC, PropsWithChildren, useState} from 'react';
import {ThemeProvider} from 'styled-components';

type MainThemeContextProps = {
	mainTheme: string,
	toggleTheme: () => void,
}

export const MainThemeContext = createContext<MainThemeContextProps>( {
	mainTheme: '',
	toggleTheme: () => {return},
});

export const ThemeState: FC<PropsWithChildren> = ({children}) => {
	const [mainTheme, setTheme] = useState('light');

	function toggleTheme()  {
		mainTheme === 'light' ? setTheme('dark') : setTheme('light');
	}

	return (
		<MainThemeContext.Provider value={{mainTheme, toggleTheme}}>
			<ThemeProvider theme={mainTheme === 'light' ? lightTheme : darkTheme}>
				{children}
			</ThemeProvider>
		</MainThemeContext.Provider>
	)
}