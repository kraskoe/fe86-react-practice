import React from 'react';
import {Outlet} from 'react-router-dom';
import {AppWrapper} from '../../components/shared/appWrapper';
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';
import {MainWrapper} from '../../components/shared/mainWrapper';
import {WidthContainer} from '../../components/shared/widthContainer/style';
import {MainArea} from '../../pages/mainPage';

export const Layout = () => {
	return (

		<AppWrapper>
			<Header />
			<MainWrapper>
				<WidthContainer>
					<MainArea>
						<Outlet />
					</MainArea>
				</WidthContainer>
			</MainWrapper>
			<Footer />
		</AppWrapper>
)
}

