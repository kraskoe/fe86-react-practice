import React, {createContext, FC, PropsWithChildren, useState} from 'react';

export const BurgerContext = createContext({
	isMenuOpen: true,
	toggleMenuMode: () => {return},
});

const BurgerState: FC<PropsWithChildren> = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleMenuMode() {
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<BurgerContext.Provider value={{ isMenuOpen, toggleMenuMode }}>{children}</BurgerContext.Provider>
	);
};

export default BurgerState;