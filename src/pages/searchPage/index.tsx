import {PageTitle} from '../mainPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {fetchPosts} from '../../store/posts/postsSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {Pagination} from '../../components/main/pagination';
import {Spinner} from '../../components/main/spinner';
import {fetchAllPosts} from '../../store/posts/allPostsSlice';
import {BreadCrumbs} from '../../components/main/breadCrumbs';

export const SearchPage = () => {
	const postsData = useAppSelector(state => state.posts);
	const allPostsData = useAppSelector(state => state.allPosts);
	const searchString = useAppSelector(state => state.search.search);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const posts = postsData.posts?.results || [];
	const {page} = useParams();
	const searchPostsNumber = allPostsData?.allPosts?.results?.filter(item => item.title.includes(searchString || ''))?.length;
	const maxPage = Math.ceil(searchPostsNumber ? searchPostsNumber / 10 : 1);

	const searchQuery = {
		ordering: 'date',
		search: searchString ? searchString : '',
		page: page || '1',
		limit: '10',
		offset: true,
	}

	useEffect(() => {
		dispatch(fetchPosts(searchQuery))
	}, [page])

	useEffect(() => {
		dispatch(fetchAllPosts('date'))
	}, []);

	useEffect(() => {
		setSearchParams({search: searchString});
	},[page])

	return (
		<>
			{postsData.error && <h2>An error occurred: {postsData.error}</h2>}
			{postsData.status === 'succeeded' ?
				<>
					<BreadCrumbs />
					<PageTitle>Search results for :</PageTitle>
					{posts.map((post) => <Post
						search
						key={post.id}
						{...post}  />)}
					{allPostsData.status === 'succeeded' ?
						<Pagination maxPage={maxPage}/> :
						<Spinner />
					}
				</> :
				<Spinner/>
			}
		</>
	)
}

