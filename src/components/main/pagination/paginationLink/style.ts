import styled from 'styled-components';

export const PaginationLinkContainer = styled.div`
  color: ${(props) => props.theme.textSecondary};
  padding: 0.5rem;
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5em;
	display: flex;
  justify-content: center;
	align-items: center;
	gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    display: block;
    fill: ${(props) => props.theme.textSecondary};
  }

  svg.disabled {
    fill: ${(props) => props.theme.textPale};
  }

  &:hover svg {
    fill: ${(props) => props.theme.primary};
  }

  &:hover,
  &.active {
	  color: ${(props) => props.theme.primary};
  }
	
	span.disabled {
    color: ${(props) => props.theme.textPale};
	}
	
  @media (min-width: ${768/16}rem) {
    padding: 0.5rem;
  }
`

PaginationLinkContainer.displayName = 'PaginationLinkContainer';