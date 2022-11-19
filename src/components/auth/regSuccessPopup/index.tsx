import {AuthButton, AuthForm,PopupContainer, PopupWrapper} from '../shared/style';
import {PageTitle} from '../../../pages/mainPage/style';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

interface RegistrationSuccessPopupProps {
	setActivationState: Dispatch<SetStateAction<boolean>>,
	fromPage: string,
}

export const RegistrationSuccessPopup = ({setActivationState, fromPage}: RegistrationSuccessPopupProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	const handleSetActivationState = () => {
		setActivationState(false);
		navigate(fromPage)
	}

	return (
		<>
			<PopupWrapper>
				<PopupContainer>
					<PageTitle>Registration Successful</PageTitle>
					<AuthForm noValidate={true}>
						<div>Email confirmed.</div>
						<div style={{marginBottom: '1rem'}}>Your registration is now completed.</div>
						<AuthButton onClick={handleSetActivationState}>Ok</AuthButton>
					</AuthForm>
				</PopupContainer>
			</PopupWrapper>
		</>
	)
}