import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {ILoginRequest} from '../../../store/slices/auth/types';
import {fetchUserData, getToken} from '../../../store/slices/auth/authSlice';
import {AuthButton, AuthError, AuthForm, AuthLabel, AuthLink, AuthTextInput, AuthToggleWrapper} from '../shared/style';

export const LoginForm = () => {
	const initialFormState = {
		ready: false,
		email: '',
		password: '',
	}
	const initialErrorState = {
		error: false,
		email: '',
		password: '',
	}
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const {email, password} = formState;
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/
	const dispatch = useAppDispatch();
	const serverError = useAppSelector(state => state.auth.authData.error)
	const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from || '/';

	const isFormReady = () => {
		if (emailRef.current?.value.trim() && passwordRef.current?.value.trim() && !errorState.error) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}

	useEffect(isFormReady,[emailRef.current?.value, passwordRef.current?.value]);

	const handleGetToken = async (loginData: ILoginRequest) => {
		const resultAction = await dispatch(getToken(loginData))
		if (getToken.fulfilled.match(resultAction)) {
			handleFetchUserData(resultAction.payload.access);
		}
	}

	const handleFetchUserData = async (accessToken: string) => {
		const resultAction = await dispatch(fetchUserData(accessToken))
		if (fetchUserData.fulfilled.match(resultAction)) {
			navigate(fromPage);
		}
	}

	const handleInputChange = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		event.preventDefault();
		setFormState({...formState, [name]: value});

		if (type === 'email' && value.trim()) {
			if (!pattern.test(value)) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.password) setErrorState({...errorState, error: false})
			}
		}

		if (type === 'password' && value.trim()) {
			if (value.trim().length < 8) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.email) setErrorState({...errorState, error: false})
			}
		}
	}

	const handleBlur = (event: FormEvent) => {
		const { value, type } = event.target as HTMLInputElement;

		if (type === 'email' && value.trim()) {
			if (!pattern.test(value)) {
				setErrorState({...errorState, email: 'Please, enter correct e-mail'})
			} else setErrorState({...errorState, email: ''})
		}

		if (type === 'password' && value.trim()) {
			if (value.trim().length < 8) {
				setErrorState({...errorState, password: 'Your password must contain at least 8 symbols'})
			} else setErrorState({...errorState, password: ''})
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
				{serverError && <div><AuthError p0>{serverError}</AuthError></div>}
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
							onChange={handleInputChange}
							onBlur={handleBlur}
							ref={emailRef} />
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
							onChange={handleInputChange}
							onBlur={handleBlur}
							ref={passwordRef} />
					</div>
				</AuthLabel>
				<AuthLink className={'mt-8'} to={'/signup'} >Forgot password?</AuthLink>
				<AuthButton disabled={!formState.ready}>Sign In</AuthButton>
				<AuthToggleWrapper>
					Don’t have an account? <AuthLink to={'/signup'} state={{from: fromPage}}>Sign Up</AuthLink>
				</AuthToggleWrapper>
			</AuthForm>
		</>
	)
}