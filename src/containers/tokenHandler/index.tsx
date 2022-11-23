import {useAppSelector} from '../../store/hooks/hooks';
import {useEffect} from 'react';

export const TokenHandler = () => {
	const token = useAppSelector(state => state.auth.authData.token);
	const access = token?.access;
	const refresh = token?.refresh;

	useEffect(() => {
		const base64Url = access?.split('.')[1];
		const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload;
		if (base64) {
			jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
		}
		console.log(jsonPayload);
	}, [access])

	return <></>
}