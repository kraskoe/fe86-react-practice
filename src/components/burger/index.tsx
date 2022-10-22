import styled from 'styled-components';
import React, {useContext} from 'react';
import {BurgerContext} from '../../context/burgerState';
import {Bar, BurgerButton } from './style';
import {MainMenu} from '../mainMenu';

const Burger = () => {
	const { isMenuOpen, toggleMenuMode } = useContext(BurgerContext);
	const clickHandler = () => {
		toggleMenuMode();
	};

	return (
		<>
			<BurgerButton
				className={isMenuOpen ? 'active' : ''}
				aria-label="Open main menu"
				onClick={clickHandler}
			>
				<Bar />
				<Bar />
				<Bar />
			</BurgerButton>
			{isMenuOpen && <MainMenu />}
		</>
	);
};

export default Burger