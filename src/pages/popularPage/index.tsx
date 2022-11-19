import getPosts from '../../utils/postProvider';
import { PostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {Pagination} from '../../components/main/pagination';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {useParams} from 'react-router-dom';
import {fetchPosts} from '../../store/slices/posts/postsSlice';
import {fetchAllPosts} from '../../store/slices/posts/allPostsSlice';
import { Spinner } from '../../components/main/spinner';
import {BreadCrumbs} from '../../components/main/breadCrumbs';

export const PopularPage = () => {
	const postsData = useAppSelector((state) => state.posts);
	const allPostsData = useAppSelector(state => state.allPosts);
	const maxPost = allPostsData?.allPosts?.count || 10;
	const maxPage = Math.ceil(maxPost / 10 );
	const {page} = useParams();
	const dispatch = useAppDispatch();
	const posts = postsData.posts?.results || [];

	const popPostsQuery = {
		page: page || '1',
		ordering: 'lesson_num',
		limit: '10',
		offset: true,
	}

	useEffect(() => {
		dispatch(fetchPosts(popPostsQuery))
	}, [page]);

	useEffect(() => {
		dispatch(fetchAllPosts('lesson_num'))
	}, []);

	return (
		<>
			{postsData.error && <h2>An error occurred: {postsData.error}</h2>}
			{postsData.status === 'succeeded' ?
				<>
					<BreadCrumbs />
					<PageTitle>Popular posts</PageTitle>
					<Tabs />
					<PostsWrapper>
						{posts.map((post) => <Post
							key={post.id}
							{...post} />)}
					</PostsWrapper>
					{allPostsData.status === 'succeeded' ?
						<Pagination maxPage={maxPage} /> :
						<Spinner />
					}
				</> :
				<Spinner />}
		</>
	)
}