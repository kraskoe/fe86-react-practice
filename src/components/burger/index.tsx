import styled from 'styled-components';
import {useContext} from 'react';
import {BurgerContext} from '../../context/burgerstate';
import {Bar, BurgerButton } from './style';
// import { MainThemeContext } from '../../context/themeState';

const Burger = () => {
	const { isMenuOpen, toggleMenuMode } = useContext(BurgerContext);
	// const toggleTheme = useContext(MainThemeContext);
	const clickHandler = () => {
		toggleMenuMode();
		// toggleTheme();
	};

	return (
		<BurgerButton
			className={isMenuOpen ? 'active' : ''}
			aria-label="Open main menu"
			onClick={clickHandler}
		>
			<Bar />
			<Bar />
			<Bar />
		</BurgerButton>
	);
};

export default Burger