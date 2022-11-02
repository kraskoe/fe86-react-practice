import {AppWrapper} from '../appWrapper';
import {Header} from '../../components/header';
import React from 'react';
import {Footer} from '../../components/footer';
import {MainWrapper} from '../mainWrapper';
import {WidthContainer} from '../widthContainer/style';
import {MainArea} from '../../pages/mainPage';
import {Outlet} from 'react-router-dom';

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

