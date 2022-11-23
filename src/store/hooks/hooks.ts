import {AppDispatch, RootState} from '../index';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {refreshToken} from '../slices/auth/authSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDispatchWithJWT = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(state => state.auth.authData.token);
	const access = token?.access || '';
	const refresh = token?.refresh || '';
	const navigate = useNavigate();

	const base64AccessData = access?.split('.')[1];
	const base64Access = base64AccessData?.replace(/-/g, '+').replace(/_/g, '/');
	let jsonAccess;
	if (base64Access) {
		jsonAccess = decodeURIComponent(window.atob(base64Access).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	}
	const accessExpiry = JSON.parse(jsonAccess || '').exp;

	if (Date.now() >= accessExpiry * 1000) {
		const base64RefreshData = refresh?.split('.')[1];
		const base64Refresh = base64RefreshData?.replace(/-/g, '+').replace(/_/g, '/');
		let jsonRefresh;
		if (base64Refresh) {
			jsonRefresh = decodeURIComponent(window.atob(base64Refresh).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
		}
		const refreshExpiry = JSON.parse(jsonRefresh || '').exp;

		if (Date.now() >= accessExpiry * 1000) {
			navigate('/login');
		}



		// try {
		// 	const newToken = await dispatch(refreshToken({refresh}));
		// 	saveToken(newToken);
		// } catch {
		// 	navigate('/login');
		// }
	} else return (callback: any, params: any) => {
		dispatch(callback({params, access}));
	};
}