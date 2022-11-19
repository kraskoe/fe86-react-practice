import {BreadCrumbs} from '../../components/main/breadCrumbs';
import React from 'react';
import {PageTitle} from '../mainPage/style';
import {LoginForm} from '../../components/auth/loginForm';


export const LoginPage = () => {
	return (
		<>
			<BreadCrumbs />
			<PageTitle>Sign In</PageTitle>
			<LoginForm />
		</>
	)
}