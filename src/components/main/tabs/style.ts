import styled from 'styled-components';

export const TabsWrapper = styled.div`
	border-bottom: ${(props) => props.theme.outline} 1px solid;
	margin-bottom: ${48/16}rem;
	display: flex;

  @media (min-width: ${768/16}rem) {
    margin-bottom: ${56 / 16}rem;
  }

  @media (min-width: ${1024/16}rem) {
    margin-bottom: ${64 / 16}rem;
  }
`
TabsWrapper.displayName = 'TabsWrapper';

export const Tab = styled.div`
  color: ${(props) => props.theme.textSecondary};
  border-bottom: transparent 2px solid;
  padding: 0 1.5rem 1.5rem;
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5em;
	cursor: pointer;

  &:hover {
	  color: ${(props) => props.theme.primary};
  }

  &.active {
    border-bottom: ${(props) => props.theme.textSecondary} 2px solid;
  }

  @media (min-width: ${768/16}rem) {
    padding: 0 2.5rem 1.5rem;
  }
`
Tab.displayName = 'Tab';