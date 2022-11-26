import {PostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {fetchUserPosts} from '../../store/slices/posts/userPostsSlice';
import {Spinner} from '../../components/main/spinner';

export const UserPostsPage = () => {
	const postsData = useAppSelector(state => state.userPosts);
	const posts = postsData.posts || [];
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserPosts(null))
	}, []);

	return (
		<>
			<BreadCrumbs />
			<PageTitle>My Posts</PageTitle>
			<Tabs />
			{postsData.status === 'succeeded' ?
				<PostsWrapper>
					{posts?.map((post) => <Post
						key={post.id}
						{...post} />)}
				</PostsWrapper> :
				<Spinner />
			}
		</>
	)
}