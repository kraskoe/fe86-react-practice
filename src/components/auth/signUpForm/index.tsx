import React, {FormEvent, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {AuthButton, AuthError, AuthForm, AuthLabel, AuthLink, AuthTextInput, AuthToggleWrapper} from '../shared/style';
import {registerNewUser} from '../../../store/slices/auth/authSlice';
import {IRegisterRequest} from '../../../store/slices/auth/types';
import {useAppDispatch} from '../../../store/hooks/hooks';
import {RegistrationConfirmationPopup} from '../regConfirmPopup';
import {RegistrationSuccessPopup} from '../regSuccessPopup';
import {
	PASSWORD_ERROR,
	CONFIRM_PASSWORD_ERROR,
	EMAIL_ERROR,
	USERNAME_ERROR,
	isConfirmPasswordValid,
	isEmailValid,
	isPasswordValid,
	isUserNameValid
} from '../validation';

export const SignUpForm = () => {
	const initialFormState = {
		ready: false,
		pending: false,
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	}
	const initialErrorState = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		serverError: '',
	}
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const [confirmRegistrationState, setConfirmRegistrationState] = useState(false);
	const [activationState, setActivationState] = useState(false);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const {username, email, password, confirmPassword} = formState;
	const fromPage = location.state?.from || '/';

	const setFormReadyState = () => {
		if (formState.username.trim() &&
			formState.email.trim() &&
			formState.password.trim() &&
			formState.confirmPassword.trim() &&
			!errorState.username &&
			!errorState.email &&
			!errorState.password &&
			!errorState.confirmPassword) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}

	useEffect(setFormReadyState,[formState.username, formState.email, formState.password, formState.confirmPassword]);

	const handleRegisterNewUser = async (registerData: IRegisterRequest) => {
		setFormState({...formState, pending: true});
		const resultAction = await dispatch(registerNewUser(registerData))
		if (registerNewUser.fulfilled.match(resultAction)) {
			setConfirmRegistrationState(true);
		} else {
			if (resultAction.payload) {
				setErrorState({...errorState , username: resultAction.payload.username || '', email: resultAction.payload.email || '', password: resultAction.payload.password || ''})
			} else {
				setErrorState({...errorState , serverError: resultAction.error.message || 'Signup error'})
			}
		}
		setFormState({...formState, pending: false});
	}

	const handleInputChange = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		event.preventDefault();
		setFormState({...formState, [name]: value});

		if (type === 'text' && value.trim()) {
			if (isUserNameValid(value)) {
				setErrorState({...errorState, username: ''});
			} else {
				setErrorState({...errorState, username: ' '});
			}
		}

		if (type === 'email' && value.trim()) {
			if (isEmailValid(value)) {
				setErrorState({...errorState, email: ''});
			} else {
				setErrorState({...errorState, email: ' '});
			}
		}

		if (type === 'password' && name === 'password' && value.trim()) {
			const confirmPasswordValue = formState.confirmPassword;
			if (isPasswordValid(value)) {
				if (isConfirmPasswordValid(confirmPasswordValue, value)) {
					setErrorState({...errorState, password: '', confirmPassword: ''});
				} else setErrorState({...errorState, password: '', confirmPassword: ' '});
			} else {
				if (isConfirmPasswordValid(confirmPasswordValue, value)) {
					setErrorState({...errorState, password: ' ', confirmPassword: ''});
				} else setErrorState({...errorState, password: ' ', confirmPassword: ' '});
			}
		}

		if (type === 'password' && name === 'confirmPassword' && value.trim()) {
			const passwordValue = formState.password || '';
			if (isConfirmPasswordValid(value, passwordValue)) {
				setErrorState({...errorState, confirmPassword: ''});
			} else {
				setErrorState({...errorState, confirmPassword: ' '});
			}
		}
	}

	const handleBlur = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		if (type === 'text' && value.trim()) {
			if (isUserNameValid(value)) {
				setErrorState({...errorState, username: ''})
			} else setErrorState({...errorState, username: USERNAME_ERROR})
		}

		if (type === 'email' && value.trim()) {
			if (isEmailValid(value)) {
				setErrorState({...errorState, email: ''})
			} else setErrorState({...errorState, email: EMAIL_ERROR})
		}

		if (type === 'password' && name === 'password' && value.trim()) {
			const confirmPasswordValue = formState.confirmPassword;
			if (isPasswordValid(value)) {
				if (isConfirmPasswordValid(confirmPasswordValue, value)) {
					setErrorState({...errorState, password: '', confirmPassword: ''});
				} else if (confirmPasswordValue.trim()) {
					setErrorState({...errorState, password: '', confirmPassword: CONFIRM_PASSWORD_ERROR});
				} else setErrorState({...errorState, password: ''});
			} else {
				if (isConfirmPasswordValid(confirmPasswordValue, value)) {
					setErrorState({...errorState, password: PASSWORD_ERROR, confirmPassword: ''});
				} else if (confirmPasswordValue.trim()) {
					setErrorState({...errorState, password: PASSWORD_ERROR, confirmPassword: CONFIRM_PASSWORD_ERROR});
				} else setErrorState({...errorState, password: PASSWORD_ERROR});
			}
		}

		if (type === 'password' && name === 'confirmPassword') {
			const passwordValue = formState.password || '';
			if (isConfirmPasswordValid(value, passwordValue)) {
				setErrorState({...errorState, confirmPassword: ''})
			} else setErrorState({...errorState, confirmPassword: CONFIRM_PASSWORD_ERROR})
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (formState.ready) {
			const form = event.target as HTMLFormElement;
			handleRegisterNewUser({username: form.username.value, email: form.email.value, password: form.password.value});
		}
	}

	return (
		<>
			<AuthForm
				noValidate={true}
				onSubmit={handleSubmit}>
				{errorState.serverError && <div><AuthError p0>{errorState.serverError}</AuthError></div>}
				<AuthLabel>
					<div>Name{errorState.username && <AuthError>{errorState.username}</AuthError>}</div>
					<div style={{display: 'flex'}}>
						<AuthTextInput
							type={'text'}
							maxLength={150}
							placeholder={'Your name'}
							name={'username'}
							value={username}
							error={!!String(errorState.username).trim()}
							onChange={handleInputChange}
							onBlur={handleBlur}
						/>
					</div>
				</AuthLabel>
				<AuthLabel>
					<div>Email{errorState.email && <AuthError>{errorState.email}</AuthError>}</div>
					<div style={{display: 'flex'}}>
						<AuthTextInput
							type={'email'}
							autoComplete={'on'}
							maxLength={50}
							placeholder={'Your email'}
							name={'email'}
							value={email}
							error={!!String(errorState.email).trim()}
							onChange={handleInputChange}
							onBlur={handleBlur}
						/>
					</div>
				</AuthLabel>
				<AuthLabel>
					<div>Password{errorState.password && <AuthError>{errorState.password}</AuthError>}</div>
					<div style={{display: 'flex'}}>
						<AuthTextInput
							type={'password'}
							autoComplete={'on'}
							maxLength={50}
							placeholder={'Your password'}
							name={'password'}
							value={password}
							error={!!String(errorState.password).trim()}
							onChange={handleInputChange}
							onBlur={handleBlur}
						/>
					</div>
				</AuthLabel>
				<AuthLabel>
					<div>Confirm Password{errorState.confirmPassword && <AuthError>{errorState.confirmPassword}</AuthError>}</div>
					<div style={{display: 'flex'}}>
						<AuthTextInput
							type={'password'}
							autoComplete={'off'}
							maxLength={50}
							placeholder={'Confirm password'}
							name={'confirmPassword'}
							value={confirmPassword}
							error={!!String(errorState.confirmPassword).trim()}
							onChange={handleInputChange}
							onBlur={handleBlur}
						/>
					</div>
				</AuthLabel>
				<AuthButton disabled={!formState.ready || formState.pending}>Sign Up</AuthButton>
				<AuthToggleWrapper>
					Already have an account? <AuthLink to={'/login'} state={{from: fromPage}}>Sign in</AuthLink>
				</AuthToggleWrapper>
			</AuthForm>
			{confirmRegistrationState && <RegistrationConfirmationPopup
				setConfirmRegistrationState={setConfirmRegistrationState}
				setActivationState={setActivationState}
				email={formState.email}/>}
			{activationState && <RegistrationSuccessPopup
				setActivationState={setActivationState}
				fromPage={fromPage}/>}
		</>
	)
}