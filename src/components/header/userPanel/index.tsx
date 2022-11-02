import {UserPanel, UserInitials, UserName} from './style';
import {useAppSelector} from '../../../store/hooks';

export const UserCredentials = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<UserPanel>
			<UserInitials>{user && user.username.split(' ').map(item => item[0])}</UserInitials>
			<UserName>{user && user.username}</UserName>
		</UserPanel>
	)
}



