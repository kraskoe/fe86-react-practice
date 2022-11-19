import getPosts from '../../utils/postProvider';
import {PostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {useLocalStorage} from '../../storage/hooks';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {fetchAllPosts} from '../../store/slices/posts/allPostsSlice';
import {initFavourites} from '../../storage/initValues';

export const FavoritesPage = () => {
	const [favourites, setFavourites] = useLocalStorage('favourites', initFavourites);
	const allPostsData = useAppSelector(state => state.allPosts);
	const dispatch = useAppDispatch();
	const allPosts = allPostsData.allPosts?.results || [];
	const posts = allPosts.filter(item => favourites.includes(item.id));
	// const posts = getPosts().filter(post => post.lesson_num >= 200).sort((prevPost, nextPost) => nextPost.date > prevPost.date ? 1 : 0);

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