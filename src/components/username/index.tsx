import styled from 'styled-components';
import {Theme} from '../../styles/theme';

type UsernameProps = {
	className?: string,
	username: string,
	theme: Theme
}

const User = (props: UsernameProps) => {
	const name = props.username;
	return <div className={props.className}>
		<UserInitials username={name}>{name.split(' ').map(item => item[0])}</UserInitials>
		<UserName username={name}>{name}</UserName>
	</div>
}

const UserName = styled.div`
	display: inline-block;
  color: ${(props: UsernameProps) => props.theme.primaryColor};
	padding: 0.8em;
  font-size: 1.5em;
`

const UserInitials = styled(UserName)`
  background-color: ${(props: UsernameProps) => props.theme.primaryHoverBg};
	border-radius: 5px;
`

export const StyledUser = styled(User)`
  display: inline-block;
  background-color: ${(props: UsernameProps) => props.theme.primaryBg};
	padding: 1em 1.5em;
`

