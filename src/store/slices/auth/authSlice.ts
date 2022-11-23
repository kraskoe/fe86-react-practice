import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {
	ILoginRequest,
	ILoginResponse,
	IUser,
	IRegisterRequest,
	IActivation,
	ILoginError,
	ISignupError, IActivationError, IRefreshTokenRequest, IRefreshTokenResponse
} from './types';
import {baseUrl, Endpoints} from './endpoints';

interface IAuthState {
	authData: {
		token: ILoginResponse | null,
		error: string | null,
	},
	profileData: {
		user: IUser| null,
		error: string | null,
	},
}

const initialState: IAuthState = {
	authData: {
		token: sessionStorage.getItem('token') ?
			JSON.parse(sessionStorage.getItem('token') || '') :
			null,
		error: null,
	},
	profileData: {
		user: sessionStorage.getItem('user') ?
			JSON.parse(sessionStorage.getItem('user') || '') :
			null,
		error: null,
	},
}

export const getToken = createAsyncThunk<ILoginResponse, ILoginRequest, {rejectValue: ILoginError}>(
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
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json()) as ILoginResponse;
	});

export const refreshToken = createAsyncThunk<IRefreshTokenResponse, IRefreshTokenRequest, {rejectValue: string}>(
	'auth/tokenHandler',
	async (refreshToken, thunkApi) => {
		const response = await fetch(`${baseUrl}${Endpoints.REFRESH}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(refreshToken)
			});

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json()) as IRefreshTokenResponse;
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

export const confirmRegistration = createAsyncThunk<IActivation, IActivation, {rejectValue: IActivationError}>(
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

		if (!response.ok) {
			return thunkApi.rejectWithValue((await response.json()))
		}

		return (await response.json());
	});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state) {
			state.authData.token = null;
			state.authData.error = null;
			state.profileData.user = null;
			state.profileData.error = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getToken.fulfilled, (state, {payload}) => {
			sessionStorage.setItem('token', JSON.stringify(payload));
			state.authData.token = payload;
			state.authData.error = null;
		});
		builder.addCase(getToken.rejected, (state, action) => {
			state.authData.token = null;
			if (action.payload) {
				state.authData.error = action.payload.detail;
			} else {
				state.authData.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(refreshToken.fulfilled, (state, {payload}) => {
			sessionStorage.setItem('token', JSON.stringify({...state.authData.token, access: payload.access}));
			if (state.authData.token) {
				state.authData.token = {...state.authData.token, access: payload.access}
			}
			state.authData.error = null;
		});
		builder.addCase(refreshToken.rejected, (state, action) => {
			state.authData.token = null;
			if (action.payload) {
				state.authData.error = action.payload;
			} else {
				state.authData.error = action.error.message ? action.error.message : 'Server error'
			}
		});
		builder.addCase(fetchUserData.fulfilled, (state, {payload}) => {
			sessionStorage.setItem('user', JSON.stringify(payload));
			state.profileData.user = payload;
			state.profileData.error = null;
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.profileData.user = null;
			if (action.payload) {
				state.profileData.error = action.payload.detail;
			} else {
				state.profileData.error = action.error.message ? action.error.message : 'Server error'
			}
		});
	},
})

export const {logOut} = authSlice.actions;
export default authSlice.reducer;