import styled from 'styled-components';

export const MainMenuWrapper = styled.div`
	background-color: ${(props) => props.theme.menu};
	width: ${236/16}rem;
	position: absolute;
	top: 5.25rem;
	left: 0;
`

export const ThemeButtonWrapper = styled.div`
	display: flex;
	gap: 1px;
  background-color: ${(props) => props.theme.secondary};
`

export const MainMenuFiller = styled.div`
	width: 100%;
	height: 5rem;
`