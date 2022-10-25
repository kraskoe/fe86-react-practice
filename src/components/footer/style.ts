import styled from 'styled-components';

export const StyledFooter = styled.footer`
  font-size: 1rem;
  line-height: 1.5em;
	color: ${(props) =>  props.theme.textPale};
	
	div div {
		padding-top: 2rem;
		padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
		border-top: ${(props) => props.theme.outline} 1px solid;
  }
	
	div div  p:nth-of-type(1) {
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    div div {
	    flex-direction: row;
    }
		
		div div p:nth-of-type(1) {
			margin-bottom: 0;
		}
	}
`