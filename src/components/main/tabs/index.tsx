import { TabsWrapper} from './style';
import React from 'react';
import { useAppSelector} from '../../../store/hooks';
import {TabLink} from './tabLink';

export const Tabs = () => {
	const user = useAppSelector((state) => state.auth.user);

	return (
		<TabsWrapper>
			<TabLink to='/posts'>All</TabLink>
			{user && <TabLink to='/favourites'>My Favourites</TabLink>}
			<TabLink to='/popular'>Popular</TabLink>
		</TabsWrapper>
	)
};