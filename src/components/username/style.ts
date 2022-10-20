import styled from 'styled-components';
import {Theme} from '../../styles/theme';

export type UsernameProps = {
	theme: Theme,
}

export const UserName = styled.div`
	display: inline-block;
  color: ${(props: UsernameProps) => props.theme.textPrimary};
	padding: 0.8em;
  font-size: 1em;
`

export const UserInitials = styled(UserName)`
  background-color: ${(props: UsernameProps) => props.theme.primaryBg};
	border-radius: 5px;
`

export const UserWrapper = styled.div`
  display: inline-block;
  background-color: ${(props: UsernameProps) => props.theme.primary};
	padding: 1em 1.5em;
`