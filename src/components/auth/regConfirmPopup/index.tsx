import {PageTitle} from '../../../pages/mainPage/style';
import React, {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {AuthButton, AuthError, AuthForm, AuthLabel, AuthTextInput, PopupContainer, PopupWrapper} from '../shared/style';
import {confirmRegistration} from '../../../store/slices/auth/authSlice';
import {useAppDispatch} from '../../../store/hooks/hooks';

interface RegistrationConfirmationPopupProps {
	setConfirmRegistrationState: Dispatch<SetStateAction<boolean>>,
	setActivationState: Dispatch<SetStateAction<boolean>>,
	email: string,
}

export const RegistrationConfirmationPopup = ({setConfirmRegistrationState, setActivationState, email}:RegistrationConfirmationPopupProps) => {
	const initialFormState = {
		ready: false,
		link: '',
	};
	const [formState, setFormState] = useState(initialFormState);
	const {link} = formState;
	const patternLink = /^http:\/\/studapi.teachmeskills.by\/\/activate\/\w+\/\w+-\w+$/
	const dispatch = useAppDispatch();
	const [errorState, setErrorState] = useState({serverError: ''});

	useEffect(() => {
		document.body.style.overflow = 'hidden'
	}, [])

	const handleConfirmRegistration = async (activationLink: string) => {
		const linkArray = activationLink.split('/');

		const resultAction = await dispatch(confirmRegistration({uid: linkArray[5], token: linkArray[6]}))
		if (confirmRegistration.fulfilled.match(resultAction)) {
			setConfirmRegistrationState(false);
			setActivationState(true);
		} else {
			console.log(resultAction);
			if (resultAction.payload) {
				setErrorState({...errorState , serverError: resultAction.payload.detail || resultAction.payload.uid || resultAction.payload.token || 'Invalid activation link'})
			} else {
				// Bad API response: status: ok, status code: 204, BUT request status: REJECTED
				// setErrorState({...errorState , serverError: resultAction.error.message || 'Server error'})
				setConfirmRegistrationState(false);
				setActivationState(true);
			}
		}
	}

	const handleInputChange = (event: FormEvent) => {
		const { value } = event.target as HTMLInputElement;

		event.preventDefault();

		if (value.trim()) {
			if (patternLink.test(value)) {
				setFormState({...formState, link: value, ready: true})
			} else {
				setFormState({...formState, link: value, ready: false})
			}
		} else setFormState({...formState, link: value, ready: false});
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (formState.ready) {
			const form = event.target as HTMLFormElement;
			handleConfirmRegistration(form.link.value);
		}
	}

	return (
		<>
			<PopupWrapper>
				<PopupContainer>
					<PageTitle>Registration Confirmation</PageTitle>
					<AuthForm noValidate={true} onSubmit={handleSubmit}>
						{errorState.serverError && <div><AuthError p0>{errorState.serverError}</AuthError></div>}
						<div style={{marginBottom: '1rem'}}>Please activate your account with the activation link in the email <b>{email}</b>. Please, check your email</div>
						<AuthLabel>
							<div style={{display: 'flex'}}>
								<AuthTextInput
									type={'text'}
									maxLength={300}
									placeholder={'Confirmation link'}
									name={'link'}
									value={link}
									onChange={handleInputChange}/>
							</div>
						</AuthLabel>
						<AuthButton disabled={!formState.ready}>Confirm Registration</AuthButton>
					</AuthForm>
				</PopupContainer>
			</PopupWrapper>
		</>
	)
}
