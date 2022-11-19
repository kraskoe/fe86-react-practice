
export interface IUser {
	username: string,
	id: number,
	email: string,
}

export interface IRegisterRequest {
	username: string,
	email: string,
	password: string,
}

export interface IActivation {
	uid: string,
	token: string,
}

export interface ILoginRequest {
	email: string,
	password: string,
}

export interface ILoginResponse {
	refresh: string,
	access: string,
}

export interface ILoginError {
	detail: string,
}

export interface IActivationError {
	detail?: string,
	uid?: string,
	token?: string,
}

export interface ISignupError {
	username?: string,
	email?: string
	password?: string,
}

