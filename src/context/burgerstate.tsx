import React, {createContext, useState} from 'react';

export const BurgerContext = createContext({
	isMenuOpen: true,
	toggleMenuMode: () => {return},
});

type StandardComponentProps = {
	children: React.ReactNode
}

const BurgerState = ({ children }: StandardComponentProps) => {
	const [isMenuOpen, toggleMenu] = useState(false);

	function toggleMenuMode() {
		toggleMenu(!isMenuOpen);
	}

	return (
		<BurgerContext.Provider value={{ isMenuOpen, toggleMenuMode }}>{children}</BurgerContext.Provider>
	);
};

export default BurgerState;