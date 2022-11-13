import {BlogArea, PopularPostWrapper, PostsWrapper, SidePostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {fetchPosts} from '../../store/posts/postsSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {Spinner} from '../../components/main/spinner';
import {fetchAllPosts} from '../../store/posts/allPostsSlice';
import { Desktop } from '../../utils/detectScreenSize';
import {Pagination} from '../../components/main/pagination';
import {useParams} from 'react-router-dom';
import {BreadCrumbs} from '../../components/main/breadCrumbs';


export const BlogPage = () => {
	const dispatch = useAppDispatch();
	const postsData = useAppSelector(state => state.posts);
	const allPostsData = useAppSelector(state => state.allPosts);
	const {page} = useParams();

	const postsQuery = {
		page: page || '1',
		ordering: 'date',
		limit: '10',
		offset: true,
	}

	useEffect(() => {
		dispatch(fetchPosts(postsQuery))
	}, [page]);

	useEffect(() => {
		dispatch(fetchAllPosts('lesson_num'))
	}, []);

	const posts = postsData.posts?.results || [];
	const sortedPosts = [...posts].reverse();

	const popularPosts = allPostsData.allPosts?.results || [];
	const sortedPopularPosts = [...popularPosts].reverse();

	const popArray = sortedPopularPosts.slice(0, 6);
	const popPost =  popArray && popArray[0];
	const maxPost = popularPosts.length;
	const maxPage = Math.ceil(maxPost && maxPost / 10 || 20);

	return (
		<>
			{postsData.error && <h2>An error occurred: {postsData.error}</h2>}
			{postsData.status === 'succeeded' ?
				<>
					<BreadCrumbs />
					<PageTitle>Blog</PageTitle>
					<Tabs />
					<BlogArea>
						<div>
							{page === '1' && <Desktop>
								{allPostsData.status === 'succeeded' ?
									<PopularPostWrapper>
										<Post
											mostPopular
											{...popPost}
										/>
									</PopularPostWrapper> :
									<Spinner />
								}
							</Desktop>}
							<PostsWrapper>
								{sortedPosts?.map((post) => <Post
									key={post.id}
									{... post}
								/>)}
							</PostsWrapper>
						</div>
						<Desktop>
							{allPostsData.status === 'succeeded' ?
								<SidePostsWrapper>
									{popArray?.slice(1).map((post) => <Post
										aside
										key={post.id}
										{...post}
									/>)}
								</SidePostsWrapper> :
								<Spinner/>
							}
						</Desktop>
					</BlogArea>
					<Pagination maxPage={maxPage} />
				</> :
				<Spinner />
			}
		</>
	)
}