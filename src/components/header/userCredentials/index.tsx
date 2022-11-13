import {UserPanel, UserInitials, UserName} from './style';
import {useAppSelector} from '../../../store/hooks/hooks';

export const UserCredentials = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<UserPanel>
			{user && <>
				<UserInitials>{user.username.split(' ').map(item => item[0])}</UserInitials>
				<UserName>{user.username}</UserName>
			</>}
		</UserPanel>
	)
}



