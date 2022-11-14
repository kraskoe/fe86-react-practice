import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {
	ILoginRequest,
	ILoginResponse,
	IUser,
	IRegisterRequest,
	IActivation,
	ILoginError,
	ISignupError, IActivationError
} from './types';
import {baseUrl, Endpoints} from './endpoints';

interface IAuthState {
	authData: {
		token: ILoginResponse | null,
		status: 'idle' | 'pending' | 'succeeded' | 'failed',
		error: string | SerializedError | null,
	},
	profileData: {
		user: IUser| null,
		status: 'idle' | 'pending' | 'succeeded' | 'failed',
		error: string | SerializedError | null,
	},
}

const initialState: IAuthState = {
	authData: {
		token: null,
		status: 'idle',
		error: null,
	},
	profileData: {
		user: null,
		status: 'idle',
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
			state.authData.status = 'idle';
			state.authData.error = null;
			state.profileData.user = null;
			state.profileData.status = 'idle';
			state.profileData.error = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getToken.fulfilled, (state, {payload}) => {
			state.authData.status = 'succeeded';
			state.authData.token = payload;
		});
		builder.addCase(getToken.rejected, (state, action) => {
			state.authData.status = 'failed';
			if (action.payload) {
				state.authData.error = action.payload.detail;
			} else {
				state.authData.error = action.error
			}
		});
		builder.addCase(fetchUserData.fulfilled, (state, {payload}) => {
			state.profileData.status = 'succeeded';
			state.profileData.user = payload;
		});
		builder.addCase(fetchUserData.rejected, (state, action) => {
			state.profileData.status = 'failed';
			if (action.payload) {
				state.profileData.error = action.payload.detail;
			} else {
				state.profileData.error = action.error
			}
		});
	},
})

export const {logOut} = authSlice.actions;
export default authSlice.reducer;