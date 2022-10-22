import {MainMenuFiller, MainMenuWrapper, ThemeButtonWrapper} from './style';
import {UserCredentials} from '../username';
import { Border } from '../burger/style';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/authState';
import {MainMenuButton, MainMenuLogButton, ThemeButton} from '../button/style';
import lightIcon from '../../images/light-icon.svg'
import darkIcon from '../../images/dark-icon.svg'
import { MainThemeContext } from '../../context/themeState';

export const MainMenu = () => {
	const { user } = useContext(AuthContext);
	const {mainTheme, toggleTheme} = useContext(MainThemeContext);
	const clickHandler = () => {
		toggleTheme();
	};
	const isLightTheme = mainTheme === 'light';

	return (
				<MainMenuWrapper>
					<Border />
					{user && <UserCredentials />}
					<MainMenuButton>Home</MainMenuButton>
					<MainMenuButton>Add Post</MainMenuButton>
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