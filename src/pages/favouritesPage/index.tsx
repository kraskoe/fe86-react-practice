import {PostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {fetchAllPosts} from '../../store/slices/posts/allPostsSlice';

export const FavoritesPage = () => {
	const favourites = useAppSelector(state => state.favourites.favourites);
	const allPostsData = useAppSelector(state => state.allPosts);
	const dispatch = useAppDispatch();
	const allPosts = allPostsData.allPosts?.results || [];
	const posts = allPosts.filter(item => favourites.includes(item.id));

	useEffect(() => {
		dispatch(fetchAllPosts('date'))
	}, []);


	return (
		<>
			<BreadCrumbs />
			<PageTitle>Favourites</PageTitle>
			<Tabs />
			<PostsWrapper>
				{posts.map((post) => <Post
					key={post.id}
					{...post} />)}
			</PostsWrapper>
		</>
	)
}