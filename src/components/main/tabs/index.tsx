import { TabsWrapper} from './style';
import React from 'react';
import { useAppSelector} from '../../../store/hooks/hooks';
import {TabLink} from './tabLink';

export const Tabs = () => {
	const user = useAppSelector((state) => state.auth.profileData.user);

	return (
		<TabsWrapper>
			<TabLink to='/posts'>All</TabLink>
			{user && <TabLink to='/favourites'>My Favourites</TabLink>}
			<TabLink to='/popular'>Popular</TabLink>
		</TabsWrapper>
	)
};