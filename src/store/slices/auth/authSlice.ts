import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
	ILoginRequest,
	IToken,
	IUser,
	IRegisterRequest,
	IActivation,
	ILoginError,
	ISignupError, IActivationError, IRefreshTokenResponse, IAuthState
} from './types';
import {baseUrl, Endpoints} from './endpoints';
import {
	getLocalstorageItem,
	getSessionstorageItem,
	setLocalstorageItem,
	setSessionstorageItem
} from '../../../storage/utils';
import {useAppDispatch} from '../../hooks/hooks';

const initialState: IAuthState = {
	authData: {
		error: null,
	},
	profileData: {
		user: sessionStorage.getItem('user') ?
			getSessionstorageItem('user') :
			null,
		error: null,
	},
}

export const getToken = createAsyncThunk<IToken, ILoginRequest, {rejectValue: ILoginError}>(
	'auth/getToken',
	async (loginData, thunkApi) => {
		const response = await fetch(`${baseUrl}${Endpoints.LOGIN}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData)
			});

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()));
		}

		return (await response.json());
	});

export const refreshToken = createAsyncThunk<IRefreshTokenResponse, null, {rejectValue: string}>(
	'auth/tokenHandler',
	async (_ = null, thunkApi) => {
		const refresh = {refresh: getLocalstorageItem('token').refresh};
		const response = await fetch(`${baseUrl}${Endpoints.REFRESH}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(refresh)
			});

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json());
	});

export const fetchUserData = createAsyncThunk<IUser, string, {rejectValue: ILoginError}>(
	'auth/fetchUserData',
	async (accessToken, thunkApi) => {
		const response = await fetch(`${baseUrl}${Endpoints.GET_USER_DATA}`,
			{
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + accessToken,
				},
			});

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json()) as IUser;
	});

export const registerNewUser = createAsyncThunk<IUser, IRegisterRequest, {rejectValue: ISignupError}>(
	'auth/registerNewUser',
	async (registerData, thunkApi) => {
		const response = await fetch(`${baseUrl}${Endpoints.REGISTER}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(registerData)
			});

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json());
	});

export const confirmRegistration = createAsyncThunk<string, IActivation, {rejectValue: IActivationError}>(
	'auth/confirmRegistration',
	async (activationData, thunkApi) => {
		const response = await fetch(`${baseUrl}${Endpoints.ACTIVATION}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(activationData)
			});

		if (response.status !== 204) {
			return thunkApi.rejectWithValue((await response.json()));
		}

		return 'Activation successful';
	});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state) {
			sessionStorage.clear();
			localStorage.clear();
			state.profileData.user = null;
			state.profileData.error = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getToken.fulfilled, (state, {payload}) => {
			setLocalstorageItem('token', payload)
			state.authData.error = null;
		});
		builder.addCase(getToken.rejected, (state, action) => {
			localStorage.removeItem('token')
			if (action.payload) {
				state.authData.error = action.payload.detail;
			} else {
				state.authData.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(refreshToken.fulfilled, (state, {payload}) => {
			const prevToken = getLocalstorageItem('token');
			setLocalstorageItem('token', {...prevToken, access: payload.access})
			state.authData.error = null;
		});
		builder.addCase(refreshToken.rejected, (state, action) => {
			const dispatch = useAppDispatch();
			dispatch(logOut);
			if (action.payload) {
				state.authData.error = action.payload;
			} else {
				state.authData.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(fetchUserData.fulfilled, (state, {payload}) => {
			setSessionstorageItem('user', payload);
			state.profileData.user = payload;
			state.profileData.error = null;
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.profileData.user = null;
			if (action.payload) {
				state.profileData.error = action.payload.detail;
			} else {
				state.profileData.error = action.error.message ? action.error.message : 'Server error';
			}
		});
	},
})

export const {logOut} = authSlice.actions;
export default authSlice.reducer;