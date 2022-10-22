import styled from 'styled-components';

export const BurgerButton = styled.button`
	padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.primary};
  display: block;
	cursor: pointer;
	
	&:hover {
		opacity: 0.8;
	}

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &.active {
    span:nth-of-type(1) {
      //transform: rotate(-45deg);
      transform: rotate(45deg) translate(0.3125rem, 0.375rem);
    }

    span:nth-of-type(2) {
      opacity: 0;
    }

    span:nth-of-type(3) {
      //transform: rotate(45deg);
      transform: rotate(-45deg) translate(0.3125rem, -0.375rem);
    }
  }
`

export const Bar = styled.span`
  display: block;
  width: 1.5rem;
  height: 0.1875rem;
  margin: 0.3125rem;
  background-color: ${(props) => props.theme.textPrimary};
	//transform-origin: right;
`;

export const Border = styled.div`
  background-color: ${(props) => props.theme.primaryBg};
	height: 1px;
	width: 100%;
	display: block;
`