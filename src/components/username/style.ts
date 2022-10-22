import styled from 'styled-components';
import {Theme} from '../../styles/theme';

export type UsernameProps = {
	theme: Theme,
}

export const UserName = styled.div`
	display: inline-block;
  color: ${(props: UsernameProps) => props.theme.textPrimary};
	padding: 0.8em;
`

export const UserInitials = styled(UserName)`
  background-color: ${(props: UsernameProps) => props.theme.primaryBg};
	border-radius: 5px;
`

export const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
	align-items: center;
  background-color: ${(props: UsernameProps) => props.theme.primary};
	padding: 0 1.5em;
	font-weight: 600;
	height: ${84/16}rem;
`