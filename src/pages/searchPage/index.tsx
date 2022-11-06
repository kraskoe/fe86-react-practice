import {PageTitle} from '../mainPage/style';
import {Post} from '../../components/main/post';
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {fetchPosts} from '../../store/postsSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Pagination} from '../../components/main/pagination';
import {Spinner} from '../../components/main/spinner';

export const SearchPage = () => {
	const postsData = useAppSelector(state => state.posts);
	const allPostsData = useAppSelector(state => state.allPosts);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchString = searchParams.get('search');
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
	}, [searchString])

	return (
		<>
			{postsData.error && <h2>An error occurred: {postsData.error}</h2>}
			{postsData.status === 'succeeded' ?
				<>
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

