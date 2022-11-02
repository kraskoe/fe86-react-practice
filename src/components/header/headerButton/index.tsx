import styled from 'styled-components';
import { StyledHeaderButton } from './style';
import {FC, PropsWithChildren} from 'react';
// import { Theme } from '../../styles/theme';

export const HeaderButton: FC<PropsWithChildren> = ({children}) => {
	return (
		<div>
			<StyledHeaderButton>
				{children}
			</StyledHeaderButton>
		</div>
	)
}



// type ButtonProps = {
// 	disabled?: boolean,
// 	theme: Theme
// };
//
// export const Button = styled.headerButton`
// 	font-size: 1.5em;
// 	font-weight: 700;
// 	cursor: ${(props: ButtonProps) => props.disabled ? 'arrow' : 'pointer'};
// 	outline: none;
// 	border: none;
// 	padding: 1.5em;
// 	border-radius: 5px;
// 	background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.primary};
// 	color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledColor : props.theme.primaryColor};
// 	&:hover {
//     background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.primary2};
// 	}
// `;
//
// export const SecondaryButton = styled(Button)`
// 	background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.secondary};
// 	color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledColor : props.theme.secondaryColor};
//   &:hover {
//      background-color: ${(props: ButtonProps) => props.disabled ? props.theme.disabledBg : props.theme.secondaryHoverBg};
//   }
// `;
