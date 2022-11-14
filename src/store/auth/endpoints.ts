export const baseUrl = 'https://studapi.teachmeskills.by';

export enum Endpoints {
	LOGIN = '/auth/jwt/create/',
	REGISTER = '/auth/users/',
	ACTIVATION = '/auth/users/activation/',
	GET_USER_DATA = '/auth/users/me/',
}