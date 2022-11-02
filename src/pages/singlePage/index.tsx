import {FullscreenPost} from '../../components/main/fullscreenPost';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {fetchPost} from '../../store/postSlice';
import {Spinner} from '../../components/main/spinner';


export const SinglePage = () => {
	const dispatch = useAppDispatch();
	const post = useAppSelector(state => state.post.post);
	const {status, error} = useAppSelector(state => state.post);
	const {id} = useParams();

	useEffect(() => {
		id && dispatch(fetchPost(id))
	}, [dispatch]);

	return(
		<>
			{error && <h2>An error occurred: {error}</h2>}
			{status === 'succeeded' ?
				post && <FullscreenPost {...post}/> :
				<Spinner/>
			}
		</>
	)
}