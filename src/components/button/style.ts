import styled from 'styled-components';

export const StyledHeaderButton = styled.button`
  background-color: ${(props) =>  props.theme.primary};
  color: ${(props) =>  props.theme.textPrimary};
	padding: 1rem 1.7rem;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1em;

  &:hover {
    opacity: 0.8;
  }

  img {
		width: 1.5rem;
		height: 1.5rem;
	}
`

export const MainMenuButton = styled.button`
	height: ${84/16}rem;
	width: 100%;
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5em;
	background-color: ${(props) => props.theme.menu};
	color: ${(props) => props.theme.textSecondary};
	border-top: ${(props) => props.theme.secondary} 1px solid;
	border-bottom: ${(props) => props.theme.secondary} 1px solid;
	
	&:hover {
    color: ${(props) => props.theme.primary};
  }
`

export const MainMenuLogButton = styled(MainMenuButton)`
	background-color: ${(props) => props.theme.secondary};
`

export const ThemeButton = styled(MainMenuButton)`
	width: 50%;
	
	img {
		width: 1.5rem;
		height: 1.5rem;
		opacity: 0.2;
	}
	
	&:hover,
	&.active {
		img {
			opacity: 1;
		}
	}
`