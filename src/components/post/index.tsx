import {
	ActionButton,
	ActionPanelFiller,
	DatePosted, PopularPostTitle,
	PostActionsWrapper, PostContainer,
	PostData,
	PostImage, PostPopularity, PostText,
	PostTitle,
	PostWrapper
} from './style';
import {ReactComponent as ThumbsUpIcon} from '../../images/thumbs_up-icon.svg';
import {ReactComponent as ThumbsDownIcon} from '../../images/thumbs_down-icon.svg';
import {ReactComponent as BookmarkIcon} from '../../images/bookmark-icon.svg';
import {ReactComponent as MoreIcon} from '../../images/more-icon.svg';

export type PostProps = {
	id: string,
	image: string,
	text: string,
	date: string,
	lesson_num: number,
	title: string,
	author: string | number,
}

type PostPropsExtended = PostProps & {
	mostPopular?: boolean,
	aside?: boolean,
}

export const Post = ({id, image, date, title, author, text, lesson_num, mostPopular, aside}: PostPropsExtended)=> {

	return (
		<PostWrapper id={id}>
			<PostContainer mostPopular={mostPopular} aside={aside}>
				<PostImage src={image} alt='' mostPopular={mostPopular} aside={aside}/>
				<PostData mostPopular={mostPopular} aside={aside}>
					<DatePosted>{date}</DatePosted>
					{mostPopular ? <PopularPostTitle>{title}</PopularPostTitle> : <PostTitle>{title}</PostTitle>}
					{mostPopular && <PostText>{text.slice(0, 300)}</PostText>}
				</PostData>
			</PostContainer>
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
