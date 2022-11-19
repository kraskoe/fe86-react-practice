import React from 'react';
import {Bar, BurgerButton } from './style';
import {MainMenu} from '../mainMenu';
import {toggleMenuOpen} from '../../../store/slices/burger/burgerSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';

const Burger = () => {
	const isMenuOpen = useAppSelector((state) => state.burger.isMenuOpen);
	const dispatch = useAppDispatch();

	const clickHandler = () => {
		dispatch(toggleMenuOpen());
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