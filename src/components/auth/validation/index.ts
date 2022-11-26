export const USERNAME_ERROR = 'Wrong format. Only letters, digits and @ . + - _ allowed.';
export const EMAIL_ERROR = 'Please, enter correct e-mail';
export const PASSWORD_ERROR = 'Your password must contain at least 8 symbols';
export const CONFIRM_PASSWORD_ERROR = 'Passwords doesn\'t match';

export function isUserNameValid(value: string) {
	const patternName = /^[\w.@+-]+$/

	return patternName.test(value.trim());
}

export function isEmailValid(value: string) {
	const patternEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/

	return patternEmail.test(value.trim());
}

export function isPasswordValid(value: string) {
	return value.trim().length >= 8;
}

export function isConfirmPasswordValid(value: string, passwordValue: string) {
	return value.trim() === passwordValue.trim();
}
