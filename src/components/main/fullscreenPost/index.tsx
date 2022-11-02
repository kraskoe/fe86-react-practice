import {
	FullscreenActionButtonWrapper,
	FullscreenPopularButtonWrapper,
	FullscreenPostImage,
	FullscreenPostText,
	FullscreenPostTitle
} from './style';
import {ActionButton, PostWrapper} from '../post/style';
import {ReactComponent as ThumbsUpIcon} from '../../../images/thumbs_up-icon.svg';
import {ReactComponent as ThumbsDownIcon} from '../../../images/thumbs_down-icon.svg';
import {ReactComponent as BookmarkIcon} from '../../../images/bookmark-icon.svg';
import React from 'react';
import {PostProps} from '../../../store/postsSlice';


export const FullscreenPost = ({id, image, date, title, author, text, lesson_num}: PostProps) => {

	return (
		<PostWrapper id={id.toString()}>
			<FullscreenPostTitle>{title}</FullscreenPostTitle>
			<FullscreenPostImage src={image} alt=''></FullscreenPostImage>
			<FullscreenPostText>{text}</FullscreenPostText>
			<FullscreenActionButtonWrapper>
				<FullscreenPopularButtonWrapper>
					<ActionButton><ThumbsUpIcon/></ActionButton>
					<ActionButton error={true}><ThumbsDownIcon/></ActionButton>
				</FullscreenPopularButtonWrapper>
				<ActionButton><BookmarkIcon/>Add to favourites</ActionButton>
			</FullscreenActionButtonWrapper>
		</PostWrapper>
	)
}