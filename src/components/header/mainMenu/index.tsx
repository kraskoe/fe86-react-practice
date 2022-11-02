import {MainMenuFiller, MainMenuWrapper, ThemeButtonWrapper} from './style';
import {UserCredentials} from '../userPanel';
import { Border } from '../burger/style';
import React, {useContext, useEffect} from 'react';
import {MainMenuButton, MainMenuLogButton, ThemeButton} from '../headerButton/style';
import lightIcon from '../../../images/light-icon.svg'
import darkIcon from '../../../images/dark-icon.svg'
import { MainThemeContext } from '../../../context/themeState';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {toggleMenuOpen} from '../../../store/burgerSlice';

export const MainMenu = () => {
	const user = useAppSelector((state) => state.auth.user);

	const {mainTheme, toggleTheme} = useContext(MainThemeContext);
	const clickHandler = () => {
		toggleTheme();
	};
	const isLightTheme = mainTheme === 'light';

	const dispatch = useAppDispatch();
	const menuHandler = () => {
		dispatch(toggleMenuOpen());
	};

	useEffect(() => {
		const root = document.getElementById('root');
		root && root.addEventListener('click', menuHandler );
		return () => {root && root.removeEventListener('click', menuHandler )};
	}, []);

	return (
		<MainMenuWrapper>
			<Border />
			{user && <UserCredentials />}
			<Link to='/'><MainMenuButton>Home</MainMenuButton></Link>
			{user && <MainMenuButton>Add Post</MainMenuButton>}
			<MainMenuFiller />
			<ThemeButtonWrapper>
				<ThemeButton
					className={isLightTheme ? 'active' : ''}
					aria-label="Turn on light theme"
					onClick={clickHandler}
					disabled={isLightTheme}
				><img src={lightIcon} alt='Light Theme' /></ThemeButton>
				<ThemeButton
					className={!isLightTheme ? 'active' : ''}
					aria-label="Turn on dark theme"
					onClick={clickHandler}
					disabled={!isLightTheme}
				><img src={darkIcon} alt='Dark Theme' /></ThemeButton>
			</ThemeButtonWrapper>
			<MainMenuLogButton>{user ? 'Log Out' : 'Sign In'}</MainMenuLogButton>
		</MainMenuWrapper>
	)
}