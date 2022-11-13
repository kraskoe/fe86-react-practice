import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks/hooks';
import {ReactElement} from 'react';

interface RequireAuthProps {
	children: ReactElement;
}

export const RequireAuth = ({children}: RequireAuthProps) => {
	const location = useLocation();
	const user = useAppSelector((state) => state.auth.user);

	if (!user) {
		return <Navigate to={'/login'} state={{from: location}} />
	}

	return children;
}