import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IInputProps {
	error?: boolean,
}

export const AuthTextInput = styled.input<IInputProps>`
	background-color: ${(props) => props.theme.textPrimary};
	color: ${(props) => props.theme.textInput};
	padding: ${18/16}rem ${20/16}rem;
	flex: 1 0 auto;
	outline: none;
	border: ${props => props.error ? `${props.theme.error} 2px solid` : 'transparent 2px solid'};
	font-size: 1rem;
  font-family: 'Inter', sans-serif;

  &::placeholder {
		font-size: 1rem;
    color: ${(props) => props.theme.textPale};
    font-family: 'Inter', sans-serif;
  }
`
AuthTextInput.displayName = 'AuthTextInput';

export const AuthLabel = styled.label`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 600;
	display: block;
	width: 100%;
	
	div:first-child {
    margin-bottom: 0.5rem;
  }
	
	div:last-child {
    margin-bottom: 2rem;
  }
	
	@media (min-width: ${768/16}rem) {
    div:last-child {
      margin-bottom: 2.5rem;
    }
  }
`
AuthLabel.displayName = 'AuthLabel';

export const AuthForm = styled.form`
	padding: ${24/16}rem;
	border: ${(props) => props.theme.outline} 1px solid;
	
	button {
		margin-top: 3rem;
    margin-bottom: 1.5rem;
	}
	
	label:last-of-type div:last-child {
		margin-bottom: 0;
	}

  @media (min-width: ${768/16}rem) {
    padding: ${40/16}rem;
  }
`
AuthForm.displayName = 'AuthForm';

export const AuthLink = styled(Link)`
  color: ${(props) => props.theme.textSecondary};
	cursor: pointer;
	
	&:hover,
	&:active {
    color: ${(props) => props.theme.primary};
  }
	
	&.mt-8 {
		padding-top: 1rem;
		display: inline-block;
	}
`
AuthLink.displayName = 'AuthLink';

export const AuthButton = styled.button`
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.textPrimary};
	padding: 1rem;
	width: 100%;
	font-size: ${18/16}rem;
	font-weight: 600;
	
	&:hover,
	&:active {
    background-color: ${(props) => props.theme.primaryBg};
  }
	
	&:disabled {
    background-color: ${(props) => props.theme.outline};
    color: ${(props) => props.theme.textPale};
		cursor: default;
  }
`
AuthButton.displayName = 'AuthButton';

export const AuthToggleWrapper = styled.div`
  color: ${(props) => props.theme.textPale};
	margin-top: ${24/16}rem;
	text-align: center;
`
AuthToggleWrapper.displayName = 'AuthToggleWrapper';

export const AuthError = styled.span<{p0?: boolean}>`
	display: inline-block;
  color: ${(props) => props.theme.error};
	margin-bottom: ${props => props.p0 ? '2rem' : '0'};
	padding-left: ${props => props.p0 ? '0' : '1rem'};
	font-weight: 600;
`
AuthError.displayName = 'AuthError';

export const PopupWrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`
PopupWrapper.displayName = 'PopupWrapper';

export const PopupContainer = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.mainBg};
`
PopupContainer.displayName = 'PopupContainer';
