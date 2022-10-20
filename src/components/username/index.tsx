import {UserWrapper, UserInitials, UserName} from './style';

export type UserProps = {
	user: string,
}

export const User = (props: UserProps) => {
	const name = props.user;
	return (
		<UserWrapper>
			<UserInitials>{name.split(' ').map(item => item[0])}</UserInitials>
			<UserName>{name}</UserName>
		</UserWrapper>
	)
}



