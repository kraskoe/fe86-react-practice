import {ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks/hooks';

interface RequireAuthProps {
	children: ReactElement;
}

export const RequireAuth = ({children}: RequireAuthProps) => {
	const location = useLocation();
	const user = useAppSelector((state) => state.auth.profileData.user);

	if (!user) {
		return <Navigate to={'/login'} state={{from: location.pathname}} />
	}

	return children;
}