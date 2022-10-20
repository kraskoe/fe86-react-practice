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
	
	img {
		width: 1.5rem;
		height: 1.5rem;
	}
`
