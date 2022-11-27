import {FullscreenPost} from '../../components/main/fullscreenPost';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {fetchPost} from '../../store/slices/posts/postSlice';
import {Spinner} from '../../components/main/spinner';
import {fetchAllPosts} from '../../store/slices/posts/allPostsSlice';
import {PostNavigation} from '../../components/main/postNavigation';
import { BreadCrumbs } from '../../components/main/breadCrumbs';


export const SinglePostPage = () => {
	const dispatch = useAppDispatch();
	const postData = useAppSelector(state => state.post);
	const allPosts = useAppSelector(state => state.allPosts);
	const post = postData.post;
	const {id} = useParams();
	const postsArray = allPosts?.allPosts?.results;

	useEffect(() => {
		id && dispatch(fetchPost(id))
	}, [id]);

	useEffect(() => {
		dispatch(fetchAllPosts('date'))
	}, []);

	return(
		<>
			{postData.error && <h2>An error occurred: {postData.error}</h2>}
			{postData.status === 'succeeded' ?
				post && <>
					<BreadCrumbs />
					<FullscreenPost {...post}/>
					{allPosts.status === 'succeeded' ?
						postsArray && <PostNavigation allPosts={postsArray} /> :
						<Spinner />
					}
				</> :
				<Spinner/>
			}
		</>
	)
}