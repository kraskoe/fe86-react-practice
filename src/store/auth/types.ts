export interface ILoginRequest {
	email: string,
	password: string,
}

export interface ILoginResponse {
	refresh: string,
	access: string,
}
