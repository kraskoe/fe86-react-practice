import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {MainMenuFiller, MainMenuWrapper, ThemeButtonWrapper} from './style';
import {UserCredentials} from '../userCredentials';
import { Border } from '../burger/style';
import {MainMenuButton, MainMenuLogButton, ThemeButton} from '../headerButton/style';
import lightIcon from '../../../images/light-icon.svg'
import darkIcon from '../../../images/dark-icon.svg'
import { MainThemeContext } from '../../../context/themeState';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {toggleMenuOpen} from '../../../store/slices/burger/burgerSlice';
import {RequireAuth} from '../../../containers/requireAuth';
import {logOut} from '../../../store/slices/auth/authSlice';
import {FromLink} from '../../shared/fromLink';

export const MainMenu = () => {
	const user = useAppSelector((state) => state.auth.profileData.user);
	const dispatch = useAppDispatch();
	const {mainTheme, toggleTheme} = useContext(MainThemeContext);
	const isLightTheme = mainTheme === 'light';

	const clickHandler = () => {
		toggleTheme();
	};

	const menuHandler = () => {
		dispatch(toggleMenuOpen());
	};

	const handleLogOut = () => {
		dispatch(logOut());
	};

	useEffect(() => {
		const root = document.getElementById('root');
		root && root.addEventListener('click', menuHandler );
		return () => {root && root.removeEventListener('click', menuHandler )};
	}, []);

	return (
		<MainMenuWrapper>
			<Border />
			{user && <RequireAuth>
				<UserCredentials />
			</RequireAuth>}
			<Link to='/'><MainMenuButton >Home</MainMenuButton></Link>
			{user && <RequireAuth>
				<Link to={'/posts/new'}>
					<MainMenuButton bt0>Add Post</MainMenuButton>
				</Link>
			</RequireAuth>}
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
			{user ?
				<MainMenuLogButton onClick={handleLogOut}>Log Out</MainMenuLogButton> :
				<FromLink to={'/login'}>
					<MainMenuLogButton>Sign In</MainMenuLogButton>
				</FromLink>
			}
		</MainMenuWrapper>
	)
}