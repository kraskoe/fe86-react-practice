import React from 'react';
import './App.css';
import { Button, SecondaryButton } from './components/button';
import {StyledUser} from './components/username';
import Burger from './components/burger';
import BurgerState from './context/burgerstate';
import {StyledHeader} from './components/header';
import {StyledSearch} from './components/search';

function App() {
	return (
		<div className='App'>
			<StyledHeader>
				<BurgerState>
					<Burger />
				</BurgerState>
				<StyledSearch />
				<StyledUser username='Artem Malkin'/>
			</StyledHeader>
			{/*<Button>Primary button</Button>*/}
			{/*<Button disabled>Disabled button</Button>*/}
			{/*<SecondaryButton>Secondary button</SecondaryButton>*/}
			{/*<SecondaryButton disabled>Disabled secondary button</SecondaryButton>*/}
		</div>
	);
}

export default App;
