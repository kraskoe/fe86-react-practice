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
import {UserPostActions} from './userPostMenu/style';
import {UserPostMenu} from './userPostMenu';
import {MouseEvent, useEffect, useState} from 'react';
import {getLocalstorageItem, setLocalstorageItem} from '../../../storage/utils';

type PostPropsExtended = PostProps & {
	mostPopular?: boolean,
	aside?: boolean,
	search?: boolean,
}

export interface ILocalStorageLikes {
	id: number,
	likes: number,
	thumbsUp: boolean,
	thumbsDown: boolean,
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
	const localStorageLikes = localStorage.getItem('likes') ? getLocalstorageItem('likes') as ILocalStorageLikes[] : [];

	if (!localStorageLikes.some(item => item.id === id)) {
		localStorageLikes.push({id: id, likes: lesson_num, thumbsUp:false, thumbsDown:false});
		setLocalstorageItem('likes', localStorageLikes);
	}

	const localStoragePost = localStorageLikes.find(item => item.id === id);
	const [likes, setLikes] = useState(localStoragePost?.likes || 0);
	const [thumbsUp, setThumbsUp] = useState(localStoragePost?.thumbsUp || false);
	const [thumbsDown, setThumbsDown] = useState(localStoragePost?.thumbsDown || false);

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

	const toggleUserActions = (event: MouseEvent) => {
		event.preventDefault();
		const target = event.target as HTMLElement;
		target.closest('.post-menu__wrapper')?.lastElementChild?.classList.toggle('active');
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
		<PostWrapper
			search={search}
			id={id.toString()}>
			<Link to={`/post/${id}`}>
				<PostContainer
					mostPopular={mostPopular}
					aside={aside}
					search={search}>
					<PostImage
						src={image}
						alt=''
						mostPopular={mostPopular}
						aside={aside}
						search={search}/>
					<PostData
						mostPopular={mostPopular}
						aside={aside}
						search={search}>
						<DatePosted>{getLocalizedDate(date)}</DatePosted>
							{mostPopular ? <PopularPostTitle>{title}</PopularPostTitle> : <PostTitle>{title}</PostTitle>}
						{mostPopular && <PostText>{text.slice(0, 300)}</PostText>}
					</PostData>
				</PostContainer>
			</Link>
			<PostActionsWrapper>
				<ActionButton
					title={'Endorse post'}
					disabled={!user}
					className={thumbsUp ? 'active' : ''}
					onClick={handleThumbsUp}
				><ThumbsUpIcon /></ActionButton>
				<PostPopularity>{likes}</PostPopularity>
				<ActionButton
					title={'Disapprove post'}
					error
					disabled={!user}
					className={thumbsDown ? 'active' : ''}
					onClick={handleThumbsDown}
				><ThumbsDownIcon /></ActionButton>
				<ActionPanelFiller />
				<ActionButton
					title={'Add to favourites'}
					disabled={!user}
					className={favourites.includes(id) ? 'active' : ''}
					onClick={() => toggleFavourites(id)}
				><BookmarkIcon /></ActionButton>
				<UserPostActions
					onMouseEnter={toggleUserActions}
					onMouseLeave={toggleUserActions}
					className={'post-menu__wrapper'}
				>
					<ActionButton
						title={'Toggle actions menu'}
						disabled={user ? user.id !== author : true}
					><MoreIcon /></ActionButton>
					<UserPostMenu postId={id} />
				</UserPostActions>
			</PostActionsWrapper>
		</PostWrapper>
	)
}
