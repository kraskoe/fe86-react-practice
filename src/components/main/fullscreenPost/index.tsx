import React, {MouseEvent, useEffect, useState} from 'react';
import {
	FullscreenActionButtonWrapper,
	FullscreenPopularButtonWrapper,
	FullscreenPostImage,
	FullscreenPostText,
	FullscreenPostTitle
} from './style';
import {ActionButton, PostPopularity, PostWrapper} from '../post/style';
import {ReactComponent as ThumbsUpIcon} from '../../../images/thumbs_up-icon.svg';
import {ReactComponent as ThumbsDownIcon} from '../../../images/thumbs_down-icon.svg';
import {ReactComponent as BookmarkIcon} from '../../../images/bookmark-icon.svg';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {setFavourites} from '../../../store/slices/favourites/favouritesSlice';
import {PostProps} from '../../../store/slices/posts/types';
import {getLocalstorageItem, setLocalstorageItem} from '../../../storage/utils';
import { ILocalStorageLikes } from '../post';


export const FullscreenPost = ({id, image, date, title, author, text, lesson_num}: PostProps) => {
	const user = useAppSelector(state => state.auth.profileData.user);
	const favourites = useAppSelector(state => state.favourites.favourites);
	const dispatch = useAppDispatch();
	let localStorageLikes = localStorage.getItem('likes') ? getLocalstorageItem('likes') as ILocalStorageLikes[] : [];

	if (!localStorageLikes.some(item => item.id === id)) {
		localStorageLikes.push({id: id, likes: lesson_num, thumbsUp:false, thumbsDown:false});
		setLocalstorageItem('likes', localStorageLikes);
	}

	let localStoragePost = localStorageLikes.find(item => item.id === id);
	const [likes, setLikes] = useState(localStoragePost?.likes || 0);
	const [thumbsUp, setThumbsUp] = useState(localStoragePost?.thumbsUp || false);
	const [thumbsDown, setThumbsDown] = useState(localStoragePost?.thumbsDown || false);

	useEffect(() => {
		localStorageLikes = localStorage.getItem('likes') ? getLocalstorageItem('likes') as ILocalStorageLikes[] : [];
		if (!localStorageLikes.some(item => item.id === id)) {
			localStorageLikes.push({id: id, likes: lesson_num, thumbsUp:false, thumbsDown:false});
			setLocalstorageItem('likes', localStorageLikes);
		}
		localStoragePost = localStorageLikes.find(item => item.id === id);
		setLikes(localStoragePost?.likes || 0);
		setThumbsUp(localStoragePost?.thumbsUp || false);
		setThumbsDown(localStoragePost?.thumbsDown || false);
	}, [id])

	useEffect(() => {
		setLocalstorageItem('likes', localStorageLikes.map(item => item.id === id ? {id, likes, thumbsUp, thumbsDown} : item));
	}, [likes])

	const toggleFavourites = (id: number) => {
		if (favourites.includes(id)) {
			dispatch(setFavourites({favourites: favourites.filter(item => item !== id)}));
		} else {
			dispatch(setFavourites({favourites: [...favourites, id]}))
		}
	}

	const handleThumbsUp = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (thumbsUp) {
			setLikes(likes - 1);
			setThumbsUp(false);
		} else if (thumbsDown) {
			setLikes(likes + 2);
			setThumbsUp(true);
			setThumbsDown(false);
		} else {
			setLikes(likes + 1);
			setThumbsUp(true);
		}
	}

	const handleThumbsDown = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (thumbsDown) {
			setLikes(likes + 1);
			setThumbsDown(false);
		} else if (thumbsUp) {
			setLikes(likes - 2);
			setThumbsDown(true);
			setThumbsUp(false);
		} else {
			setLikes(likes - 1);
			setThumbsDown(true);
		}
	}

	return (
		<PostWrapper id={id.toString()}>
			<FullscreenPostTitle>{title}</FullscreenPostTitle>
			<FullscreenPostImage src={image} alt=''></FullscreenPostImage>
			<FullscreenPostText>{text}</FullscreenPostText>
			<FullscreenActionButtonWrapper>
				<FullscreenPopularButtonWrapper>
					<ActionButton
						title={'Endorse post'}
						disabled={!user}
						className={thumbsUp ? 'active' : ''}
						onClick={handleThumbsUp}
					><ThumbsUpIcon/></ActionButton>
					<PostPopularity>{likes}</PostPopularity>
					<ActionButton
						error
						title={'Disapprove post'}
						disabled={!user}
						className={thumbsDown ? 'active' : ''}
						onClick={handleThumbsDown}
					><ThumbsDownIcon/></ActionButton>
				</FullscreenPopularButtonWrapper>
				<ActionButton
					title={'Add to favourites'}
					disabled={!user}
					className={favourites.includes(id) ? 'active' : ''}
					onClick={() => toggleFavourites(id)}
				><BookmarkIcon/>Add to favourites</ActionButton>
			</FullscreenActionButtonWrapper>
		</PostWrapper>
	)
}