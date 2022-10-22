import {MainWrapper} from '../../components/mainWrapper';
import {Header} from '../../components/header';
import React, {FC, PropsWithChildren} from 'react';
import {Footer} from '../../components/footer';
import AuthorizationState from '../../context/authState';

export const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
		<MainWrapper>
			<AuthorizationState>
				<Header />
				{children}
			</AuthorizationState>
			<Footer />
		</MainWrapper>
)
}

