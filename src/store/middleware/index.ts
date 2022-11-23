import jwtDecode from 'jwt-decode';
import {logOut, refreshToken} from '../slices/auth/authSlice';
import {AppDispatch} from '../index';
import {Middleware} from 'redux';

export const jwtRefreshMiddleware: Middleware<any> = (store) => {
	const dispatch = store.dispatch as AppDispatch;
	return (next: any) => (action) => {
		console.log(action);
		if (action.type === 'posts/newPost/pending') {
			const access = store.getState().auth.authData.token.access;
			if (access) {
				const decoded: {exp: number} = jwtDecode(access);
				if (decoded.exp && decoded.exp - 10 < Date.now()/1000) {
					const refresh = store.getState().auth.authData.token.refresh;
						dispatch(refreshToken({refresh: refresh}))
							.then(() => {
								return next(action);
							})
							.catch((error: Error) => {
								return store.dispatch(logOut());
							})
				}
			}
		}
		return next(action);
	}
}

// const base64RefreshData = refresh?.split('.')[1];
// const base64Refresh = base64RefreshData?.replace(/-/g, '+').replace(/_/g, '/');
// let jsonRefresh;
// if (base64Refresh) {
// 	jsonRefresh = decodeURIComponent(window.atob(base64Refresh).split('').map(function(c) {
// 		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// 	}).join(''));
// }
// const refreshExpiry = JSON.parse(jsonRefresh || '').exp;
