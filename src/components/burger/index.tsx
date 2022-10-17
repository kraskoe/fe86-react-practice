import styled from 'styled-components';
import {useContext} from 'react';
import {BurgerContext} from '../../context/burgerstate';

const BurgerButton = styled.button`
	padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.primaryBg};
  display: block;
	cursor: pointer;

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &.active {
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(10px, 10px);
    }

    span:nth-of-type(2) {
      opacity: 0;
    }

    span:nth-of-type(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
`

const Bar = styled.span`
  display: block;
  width: 2.5rem;
  height: 0.25rem;
  margin: 0.5rem;
  background-color: ${(props) => props.theme.primaryColor};
`;

const Burger = () => {
	const { isMenuOpen, toggleMenuMode } = useContext(BurgerContext);

	const clickHandler = () => {
		toggleMenuMode();
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