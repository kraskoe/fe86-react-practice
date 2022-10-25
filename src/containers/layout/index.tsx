import {AppWrapper} from '../appWrapper';
import {Header} from '../../components/header';
import React, {FC, PropsWithChildren} from 'react';
import {Footer} from '../../components/footer';
import AuthorizationState from '../../context/authState';

export const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
		<AppWrapper>
			<AuthorizationState>
				<Header />
				{children}
			</AuthorizationState>
			<Footer />
		</AppWrapper>
)
}

