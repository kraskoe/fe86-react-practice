export const baseUrl = 'https://studapi.teachmeskills.by';

export enum Endpoints {
	LOGIN = '/auth/jwt/create/',
	REFRESH = '/auth/jwt/refresh/',
	REGISTER = '/auth/users/',
	ACTIVATION = '/auth/users/activation/',
	GET_USER_DATA = '/auth/users/me/',
}