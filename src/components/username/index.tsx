import {UserWrapper, UserInitials, UserName} from './style';
import {AuthContext} from '../../context/authState';
import {useContext} from 'react';

export const UserCredentials = () => {
	const { user } = useContext(AuthContext);

	return (
		<UserWrapper>
			<UserInitials>{user && user.username.split(' ').map(item => item[0])}</UserInitials>
			<UserName>{user && user.username}</UserName>
		</UserWrapper>
	)
}



