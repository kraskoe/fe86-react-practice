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
import {ReactComponent as ThumbsUpIcon} from '../../../images/thumbs_up-icon.svg';
import {ReactComponent as ThumbsDownIcon} from '../../../images/thumbs_down-icon.svg';
import {ReactComponent as BookmarkIcon} from '../../../images/bookmark-icon.svg';
import {ReactComponent as MoreIcon} from '../../../images/more-icon.svg';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/hooks';
import { setFavourites } from '../../../store/slices/favourites/favouritesSlice';
import {PostProps} from '../../../store/slices/posts/types';

type PostPropsExtended = PostProps & {
	mostPopular?: boolean,
	aside?: boolean,
	search?: boolean,
}

function getLocalizedDate(date: string): string {
	return (new Date(date)).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export const Post = ({id, image, date, title, author, text, lesson_num, mostPopular, aside, search}: PostPropsExtended)=> {
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
		<PostWrapper search={search} id={id.toString()}>
			<Link to={`/post/${id}`}>
				<PostContainer mostPopular={mostPopular} aside={aside} search={search}>
					<PostImage src={image} alt='' mostPopular={mostPopular} aside={aside} search={search}/>
					<PostData mostPopular={mostPopular} aside={aside} search={search}>
						<DatePosted>{getLocalizedDate(date)}</DatePosted>
							{mostPopular ? <PopularPostTitle>{title}</PopularPostTitle> : <PostTitle>{title}</PostTitle>}
						{mostPopular && <PostText>{text.slice(0, 300)}</PostText>}
					</PostData>
				</PostContainer>
			</Link>
			<PostActionsWrapper>
				<ActionButton disabled={!user}><ThumbsUpIcon /></ActionButton>
				<PostPopularity>{lesson_num}</PostPopularity>
				<ActionButton error={true} disabled={!user}><ThumbsDownIcon /></ActionButton>
				<ActionPanelFiller />
				<ActionButton disabled={!user} className={favourites.includes(id) ? 'active' : ''} onClick={() => toggleFavourites(id)}><BookmarkIcon /></ActionButton>
				<ActionButton disabled={user ? user.id !== author : true}><MoreIcon /></ActionButton>
			</PostActionsWrapper>
		</PostWrapper>
	)
}
