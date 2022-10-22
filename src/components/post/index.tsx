import {
	ActionButton,
	ActionPanelFiller,
	DatePosted,
	PostActionsWrapper,
	PostImage, PostPopularity,
	PostTitle,
	PostWrapper
} from './style';
import {ReactComponent as ThumbsUpIcon} from '../../images/thumbs_up-icon.svg';
import {ReactComponent as ThumbsDownIcon} from '../../images/thumbs_down-icon.svg';
import {ReactComponent as BookmarkIcon} from '../../images/bookmark-icon.svg';
import {ReactComponent as MoreIcon} from '../../images/more-icon.svg';
import image from '../../images/Rectangle 39.png';

type PostProps = {
	'id': number | string,
	'image': string,
	'text': string,
	'date': string,
	'lesson_num': number,
	'title': string,
	'author': string | number,
}

export const Post = ({id, image, date, title, author, text, lesson_num}: PostProps)=> {

	return (
		<PostWrapper>
			<PostImage src={image} alt='' />
			<DatePosted>{date}</DatePosted>
			<PostTitle>{title}</PostTitle>
			<PostActionsWrapper>
				<ActionButton><ThumbsUpIcon /></ActionButton>
				<PostPopularity>{lesson_num}</PostPopularity>
				<ActionButton error={true}><ThumbsDownIcon /></ActionButton>
				<ActionPanelFiller />
				<ActionButton><BookmarkIcon /></ActionButton>
				<ActionButton><MoreIcon /></ActionButton>
			</PostActionsWrapper>
		</PostWrapper>
	)
}