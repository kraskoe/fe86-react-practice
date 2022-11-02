import { PaginationWrapper } from './style'
import {PaginationLink} from './paginationLink';
import {useParams} from 'react-router-dom';
import { TabletOrDesktop } from '../../../utils/detectScreenSize';
import {ReactComponent as ArrowLeftIcon} from '../../../images/arrow-left-icon.svg';
import {ReactComponent as ArrowRightIcon} from '../../../images/arrow-right-icon.svg';
import { ActionPanelFiller } from '../post/style';
import {PaginationLinkPanel} from './paginationLinkPanel';

export const Pagination = ({maxPage}: {maxPage: number}) => {
	const {page} = useParams();

	return (
		<PaginationWrapper>
			<PaginationLink to={`/posts/${page && Number(page) - 1}`}
			                style={Number(page) < 2 ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<ArrowLeftIcon className={Number(page) < 2 ? 'disabled' : ''} />
				<TabletOrDesktop>
					<span className={Number(page) < 2 ? 'disabled' : ''} >Prev</span>
				</TabletOrDesktop>
			</PaginationLink>
			<ActionPanelFiller />
			<PaginationLinkPanel maxPage={maxPage} />
			<ActionPanelFiller />
			<PaginationLink to={`/posts/${page && Number(page) + 1}`}
			                style={Number(page) > maxPage - 1 ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<TabletOrDesktop>
					<span className={Number(page) > maxPage - 1 ? 'disabled' : ''} >Next</span>
				</TabletOrDesktop>
				<ArrowRightIcon className={Number(page) > maxPage - 1 ? 'disabled' : ''} />
			</PaginationLink>
		</PaginationWrapper>
	)
}