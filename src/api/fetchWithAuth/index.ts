import jwtDecode from 'jwt-decode';
import {getLocalstorageItem} from '../../storage/utils';
import {logOut, refreshToken} from '../../store/slices/auth/authSlice';
import {AppDispatch} from '../../store';

export async function fetchWithAuth(url: string, options: RequestInit, dispatch: AppDispatch) {
	let tokenData = null;

	if (localStorage.token) {
		tokenData = getLocalstorageItem('token');
	} else {
		dispatch(logOut());
	}

	if (!options.headers) {
		options.headers = {};
	}

	if (tokenData) {
		const decoded: {exp: number} = jwtDecode(tokenData.access);
		if (decoded.exp && decoded.exp * 1000 - 3000 < Date.now()) {
			try {
				const response = await dispatch(refreshToken(null));
				tokenData.access = typeof response.payload === 'object' && response.payload?.access;
			} catch (e) {
				dispatch(logOut());
			}
		}
		options.headers = {...options.headers, Authorization: `Bearer ${tokenData.access}`};
	}

	return fetch(url, options);
}