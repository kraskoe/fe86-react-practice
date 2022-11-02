import {BlogArea, PopularPostWrapper, PostsWrapper, SidePostsWrapper} from '../blogPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/main/tabs';
import {fetchPosts} from '../../store/postsSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Spinner} from '../../components/main/spinner';
import {fetchPopularPosts} from '../../store/popularPostsSlice';
import { Desktop } from '../../utils/detectScreenSize';
import {Pagination} from '../../components/main/pagination';
import {useParams} from 'react-router-dom';


export const BlogPage = () => {
	const dispatch = useAppDispatch();
	const postsData = useAppSelector(state => state.posts);
	const popularPostsData = useAppSelector(state => state.popularPosts);
	const {page} = useParams();

	useEffect(() => {
		dispatch(fetchPosts(page ? Number(page) : 1))
	}, [page]);
	const posts = postsData.posts?.results;

	useEffect(() => {
		dispatch(fetchPopularPosts())
	}, [dispatch]);

	const popArray = popularPostsData && (popularPostsData.popularPosts ? popularPostsData.popularPosts.slice(0, 6) : []);
	const popPost =  popArray && popArray[0];
	const maxPost = popularPostsData?.popularPosts?.length;
	const maxPage = Math.ceil(maxPost && maxPost / 10 || 20);

	return (
		<>
			{postsData.error && <h2>An error occurred: {postsData.error}</h2>}
			{postsData.status === 'succeeded' ?
				<>
					<PageTitle>Blog</PageTitle>
					<Tabs />
					<BlogArea>
						<div>
							{page === '1' && <Desktop>
								{popularPostsData.status === 'succeeded' ?
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
								{posts?.map((post) => <Post
									key={post.id}
									{... post}
								/>)}
							</PostsWrapper>
						</div>
						<Desktop>
							{popularPostsData.status === 'succeeded' ?
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