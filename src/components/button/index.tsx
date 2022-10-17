import styled from 'styled-components';
import { Theme } from '../../styles/theme';

type ButtonProps = {
	disabled?: boolean,
	theme: Theme
};

export const Button = styled.button`
	font-size: 1.5em;
	font-weight: 700;
	cursor: ${(props: ButtonProps) => props.disabled ? 'arrow' : 'pointer'};
	outline: none;
	border: none;
	padding: 1.5em;
	border-radius: 5px;
	background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.primaryBg};
	color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledColor : props.theme.primaryColor};
	&:hover {
    background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.primaryHoverBg};
	}
`;

export const SecondaryButton = styled(Button)`
	background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.secondaryBg};
	color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledColor : props.theme.secondaryColor};
  &:hover {
     background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.secondaryHoverBg};
  }
`;
