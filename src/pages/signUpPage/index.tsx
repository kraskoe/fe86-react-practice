import {BreadCrumbs} from '../../components/main/breadCrumbs';
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {PageTitle} from '../mainPage/style';
import {
	AuthButton,
	AuthError,
	AuthForm,
	AuthLabel,
	AuthLink,
	AuthTextInput,
	AuthToggleWrapper
} from '../../components/auth/shared/style';

const initialFormState = {
	ready: false,
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const initialErrorState = {
	error: false,
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
}

export const SignUpPage = () => {
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const {name, email, password, confirmPassword} = formState;
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const patternName = /^[\w.@+-]+$/
	const patternEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/

	const isFormReady = () => {
		if (nameRef.current?.value.trim() && emailRef.current?.value.trim() && passwordRef.current?.value.trim() && confirmPasswordRef.current?.value.trim() && !errorState.error) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}

	useEffect(isFormReady,[nameRef.current?.value, emailRef.current?.value, passwordRef.current?.value, confirmPasswordRef.current?.value]);

	const handleInputChange = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		event.preventDefault();
		setFormState({...formState, [name]: value});

		if (type === 'text' && value.trim()) {
			if (!patternName.test(value)) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.email && !errorState.password && !errorState.confirmPassword) setErrorState({...errorState, error: false})
			}
		}

		if (type === 'email' && value.trim()) {
			if (!patternEmail.test(value)) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.name && !errorState.password && !errorState.confirmPassword) setErrorState({...errorState, error: false})
			}
		}

		if (type === 'password' && name === 'password' && value.trim()) {
			if (value.trim().length < 8) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.name && !errorState.email && !errorState.confirmPassword) setErrorState({...errorState, error: false})
			}
		}

		if (type === 'password' && name === 'confirmPassword') {
			if (value.trim() && value !== passwordRef.current?.value) {
				if (!errorState.error) setErrorState({...errorState, error: true})
			} else {
				if (!errorState.name && !errorState.email && !errorState.password) setErrorState({...errorState, error: false})
			}
		}
	}

	const handleBlur = (event: FormEvent) => {
		const { name, value, type } = event.target as HTMLInputElement;

		if (nameRef.current?.value.trim() && emailRef.current?.value.trim() && passwordRef.current?.value.trim() && confirmPasswordRef.current?.value.trim()) {
			setFormState({...formState, ready: true})
		} else setFormState({...formState, ready: false})

		if (type === 'text' && value.trim()) {
			if (!patternName.test(value)) {
				setErrorState({...errorState, name: 'Wrong format. Only letters, digits and @ . + - _ allowed.'})
			} else setErrorState({...errorState, name: ''})
		}

		if (type === 'email' && value.trim()) {
			if (!patternEmail.test(value)) {
				setErrorState({...errorState, email: 'Please, enter correct e-mail'})
			} else setErrorState({...errorState, email: ''})
		}

		if (type === 'password' && name === 'password' && value.trim()) {
			if (value.trim().length < 8) {
				setErrorState({...errorState, password: 'Your password must contain at least 8 symbols'})
			} else setErrorState({...errorState, password: ''})
		}

		if (type === 'password' && name === 'confirmPassword') {
			if (value.trim() && value !== passwordRef.current?.value) {
				setErrorState({...errorState, confirmPassword: 'Passwords doesn\'t match'})
			} else setErrorState({...errorState, confirmPassword: ''})
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (formState.ready) {
			console.log('GO');
		}
	}

	return (
		<>
			<BreadCrumbs />
			<PageTitle>Sign Up</PageTitle>
			<AuthForm noValidate={true} onSubmit={handleSubmit}>
				<AuthLabel>
					<div>Name{errorState.name && <AuthError>{errorState.name}</AuthError>}</div>
					<div style={{display: 'flex'}}>
						<AuthTextInput
							type={'text'}
							maxLength={150}
							placeholder={'Your name'}
							name={'name'}
							value={name}
							onChange={handleInputChange}
							onBlur={handleBlur}
							ref={nameRef} />
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
							onChange={handleInputChange}
							onBlur={handleBlur}
							ref={confirmPasswordRef} />
					</div>
				</AuthLabel>
				<AuthButton disabled={!formState.ready}>Sign Up</AuthButton>
				<AuthToggleWrapper>
					Already have an account? <AuthLink to={'/login'}>Sign in</AuthLink>
				</AuthToggleWrapper>
			</AuthForm>
	</>
)
}