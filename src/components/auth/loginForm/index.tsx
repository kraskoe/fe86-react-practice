import React, {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../store/hooks/hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {ILoginRequest} from '../../../store/slices/auth/types';
import {fetchUserData, getToken} from '../../../store/slices/auth/authSlice';
import {AuthButton, AuthError, AuthForm, AuthLabel, AuthLink, AuthTextInput, AuthToggleWrapper} from '../shared/style';
import {EMAIL_ERROR,
	PASSWORD_ERROR,
	isEmailValid,
	isPasswordValid} from '../validation';

export const LoginForm = () => {
	const initialFormState = {
		ready: false,
		pending: false,
		email: '',
		password: '',
	}
	const initialErrorState = {
		email: '',
		password: '',
		serverError: '',
	}
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const {email, password} = formState;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from || '/';

	const setFormReadyState = () => {
		if (formState.email.trim() &&
			formState.password.trim() &&
			!errorState.password &&
			!errorState.email) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}

	useEffect(setFormReadyState,[formState.email, formState.password]);

	const handleGetToken = async (loginData: ILoginRequest) => {
		setFormState({...formState, pending: true});
		const resultAction = await dispatch(getToken(loginData))
		if (getToken.fulfilled.match(resultAction)) {
			handleFetchUserData(resultAction.payload.access);
		} else {
			setErrorState({...errorState , serverError: resultAction.error.message || 'Login error'})
			setFormState({...formState, pending: false});
		}
	}

	const handleFetchUserData = async (accessToken: string) => {
		const resultAction = await dispatch(fetchUserData(accessToken))
		if (fetchUserData.fulfilled.match(resultAction)) {
			navigate(fromPage);
			setFormState({...formState, pending: false});
		} else {
			setErrorState({...errorState , serverError: resultAction.error.message || 'Error fetching user data'})
			setFormState({...formState, pending: false});
		}
	}

	const handleInputChange = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		event.preventDefault();
		setFormState({...formState, [name]: value});

		if (type === 'email' && value.trim()) {
			if (isEmailValid(value)) {
				setErrorState({...errorState, email: ''});
			} else {
				setErrorState({...errorState, email: ' '});
			}
		}

		if (type === 'password' && value.trim()) {
			if (isPasswordValid(value)) {
				setErrorState({...errorState, password: ''});
			} else {
				setErrorState({...errorState, password: ' '});
			}
		}
	}

	const handleBlur = (event: FormEvent) => {
		const { value, type } = event.target as HTMLInputElement;

		if (type === 'email' && value.trim()) {
			if (isEmailValid(value)) {
				setErrorState({...errorState, email: ''})
			} else setErrorState({...errorState, email: EMAIL_ERROR})
		}

		if (type === 'password' && value.trim()) {
			if (isPasswordValid(value)) {
				setErrorState({...errorState, password: ''})
			} else setErrorState({...errorState, password: PASSWORD_ERROR})
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		if (formState.ready) {
			handleGetToken({email: form.email.value, password: form.password.value});
		}

	}

	return (
		<>
			<AuthForm
				noValidate={true}
				autoComplete={'on'}
				onSubmit={handleSubmit}>
				{errorState.serverError && <div><AuthError p0>{errorState.serverError}</AuthError></div>}
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
				<AuthLink className={'mt-8'} to={'/signup'} >Forgot password?</AuthLink>
				<AuthButton disabled={!formState.ready || formState.pending}>Sign In</AuthButton>
				<AuthToggleWrapper>
					Don’t have an account? <AuthLink to={'/signup'} state={{from: fromPage}}>Sign Up</AuthLink>
				</AuthToggleWrapper>
			</AuthForm>
		</>
	)
}