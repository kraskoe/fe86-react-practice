import {Tab, TabsWrapper} from './style';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/authState';
import {Link} from 'react-router-dom';
import {TabsContext} from '../../context/tabsState';

export const Tabs = () => {
	const { user } = useContext(AuthContext);
	const {activeTab, setCurrentTab} = useContext(TabsContext);

	return (
		<TabsWrapper>
			<Link to='/'><Tab className={activeTab === 'blog' ? 'active' : ''} onClick={() => setCurrentTab('blog')}>All</Tab></Link>
			{user && <Link to='/favourites'><Tab className={activeTab === 'favourites' ? 'active' : ''} onClick={() => setCurrentTab('favourites')}>My Favourites</Tab></Link>}
			<Link to='/popular'><Tab className={activeTab === 'popular' ? 'active' : ''} onClick={() => setCurrentTab('popular')}>Popular</Tab></Link>
		</TabsWrapper>
	)
}