import styled from 'styled-components';

export const PaginationWrapper = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;
	padding-top: ${56/16}rem;
	
	@media(min-width: ${768/16}rem) {
    padding-top: ${72/16}rem;
	}
`