import styled, {keyframes} from 'styled-components';

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const StyledSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-bottom: 10px solid transparent; /* Light grey */
  border-top: 10px solid ${(props) => props.theme.primary}; /* Black */
  border-left: 10px solid ${(props) => props.theme.primary}; /* Black */
  border-right: 10px solid ${(props) => props.theme.primary}; /* Black */
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`

export const SpinnerWrapper = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;
`