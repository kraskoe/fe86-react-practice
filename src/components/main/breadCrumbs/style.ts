import styled from 'styled-components';

export const StyledBreadCrumbLink = styled.span`
	color: ${(props) => props.theme.textSecondary};
	
	&:hover,
	&.active{
    color: ${(props) => props.theme.textPale};
  }
	
	@media (min-width: ${768/16}rem) {
    margin-bottom: ${32/16}rem;
  }
`

export const BreadCrumbNav = styled.nav`
  margin-bottom: ${28/16}rem;

  @media (min-width: ${768/16}rem) {
    margin-bottom: ${32/16}rem;
  }
`