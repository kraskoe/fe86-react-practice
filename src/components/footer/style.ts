import styled from 'styled-components';

export const StyledFooter = styled.footer`
  font-size: 1rem;
  line-height: 1.5rem;
	color: ${(props) =>  props.theme.textPale};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 0;
	border-top: ${(props) => props.theme.outline} 1px solid;
	
	@media (max-width: 768px) {
    flex-direction: column;
		
		p:nth-of-type(1) {
			margin-bottom: 1.5rem;
		}
	}
`