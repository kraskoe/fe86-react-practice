import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AuthTextInput = styled.input`
	background-color: ${(props) => props.theme.textPrimary};
	color: ${(props) => props.theme.textPale};
	padding: ${18/16}rem ${20/16}rem;
	flex: 1 0 auto;
	outline: none;
	border: none;
	font-size: 1rem;
	
	&::placeholder {
		font-size: 1rem;
	}
`
AuthTextInput.displayName = 'AuthTextInput';

export const AuthLabel = styled.label`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 600;
	display: block;
	
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

export const AuthError = styled.span`
  color: ${(props) => props.theme.error};
	margin-bottom: 1rem;
	padding-left: 1rem;
`
AuthError.displayName = 'AuthError';
