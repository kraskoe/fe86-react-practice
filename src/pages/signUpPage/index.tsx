import {BreadCrumbs} from '../../components/main/breadCrumbs';
import React from 'react';
import {PageTitle} from '../mainPage/style';
import {SignUpForm} from '../../components/auth/signUpForm';

export const SignUpPage = () => {
	return (
		<>
			<BreadCrumbs />
			<PageTitle>Sign Up</PageTitle>
			<SignUpForm />
	</>
)
}