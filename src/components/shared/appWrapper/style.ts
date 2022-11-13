import styled from 'styled-components';

export const StyledAppWrapper = styled.div`
	background-color: ${(props) => props.theme.mainBg};
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`

StyledAppWrapper.displayName = 'StyledAppWrapper';