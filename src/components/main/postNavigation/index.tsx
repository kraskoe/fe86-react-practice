import {useLocation, useParams} from 'react-router-dom';
import {Desktop, TabletOrDesktop } from '../../../utils/detectScreenSize';
import {ReactComponent as ArrowLeftIcon} from '../../../images/arrow-left-icon.svg';
import {ReactComponent as ArrowRightIcon} from '../../../images/arrow-right-icon.svg';
import { PaginationWrapper } from '../pagination/style';
import {PaginationLink} from '../pagination/paginationLink';
import {PostProps} from '../../../store/posts/postsSlice';
import {ActionPanelFiller} from '../post/style';
import {PostNavTitle, PostNavWrapper} from './style';

interface PostNavigationProps {
	allPosts: PostProps[],
}

export const PostNavigation = ({allPosts}: PostNavigationProps) => {
	const {id} = useParams();
	const postElement = id && allPosts.find((item) => item.id === Number(id));
	const postIndex = postElement && allPosts.indexOf(postElement);
	const prevPost = postIndex && allPosts[postIndex - 1]
	const nextPost = postIndex !== undefined && postIndex < allPosts.length - 1 && allPosts[Number(postIndex) + 1]
	const prevPostId = prevPost && prevPost.id;
	const prevPostTitle = prevPost && prevPost.title;
	const nextPostId = nextPost && nextPost.id;
	const nextPostTitle = nextPost && nextPost.title;

	return (
		<PaginationWrapper>
			<PaginationLink to={`/post/${prevPostId}`}
			                style={!prevPost ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<ArrowLeftIcon className={!prevPost ? 'disabled' : ''} />
				<PostNavWrapper>
					<TabletOrDesktop>
						<span className={!prevPost ? 'disabled' : ''} >Prev</span>
					</TabletOrDesktop>
					<Desktop>
						{prevPost ? <PostNavTitle className={!prevPost ? 'disabled' : ''} >{prevPostTitle}</PostNavTitle> : <></>}
					</Desktop>
				</PostNavWrapper>
			</PaginationLink>
			<ActionPanelFiller />
			<PaginationLink to={`/post/${nextPostId}`}
			                style={!nextPost ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<PostNavWrapper>
					<TabletOrDesktop>
						<span className={!nextPost ? 'disabled' : ''} >Next</span>
					</TabletOrDesktop>
					<Desktop>
						{nextPost ? <PostNavTitle className={!nextPost ? 'disabled' : ''} >{nextPostTitle}</PostNavTitle> : <></>}
					</Desktop>
				</PostNavWrapper>
				<ArrowRightIcon className={!nextPost ? 'disabled' : ''} />
			</PaginationLink>
		</PaginationWrapper>
	)
}