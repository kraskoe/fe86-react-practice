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
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import {setFavourites} from '../../../store/slices/favourites/favouritesSlice';
import {PostProps} from '../../../store/slices/posts/types';


export const FullscreenPost = ({id, image, date, title, author, text, lesson_num}: PostProps) => {
	const user = useAppSelector(state => state.auth.profileData.user);
	const favourites = useAppSelector(state => state.favourites.favourites);
	const dispatch = useAppDispatch();

	const toggleFavourites = (id: number) => {
		if (favourites.includes(id)) {
			dispatch(setFavourites({favourites: favourites.filter(item => item !== id)}));
		} else {
			dispatch(setFavourites({favourites: [...favourites, id]}))
		}
	}

	return (
		<PostWrapper id={id.toString()}>
			<FullscreenPostTitle>{title}</FullscreenPostTitle>
			<FullscreenPostImage src={image} alt=''></FullscreenPostImage>
			<FullscreenPostText>{text}</FullscreenPostText>
			<FullscreenActionButtonWrapper>
				<FullscreenPopularButtonWrapper>
					<ActionButton title={'Endorse post'}><ThumbsUpIcon/></ActionButton>
					<PostPopularity>{lesson_num}</PostPopularity>
					<ActionButton error title={'Disapprove post'}><ThumbsDownIcon/></ActionButton>
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