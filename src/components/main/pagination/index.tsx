import {useLocation, useParams} from 'react-router-dom';
import { PaginationWrapper } from './style'
import {PaginationLink} from './paginationLink';
import { TabletOrDesktop } from '../../../utils/detectScreenSize';
import {ReactComponent as ArrowLeftIcon} from '../../../images/arrow-left-icon.svg';
import {ReactComponent as ArrowRightIcon} from '../../../images/arrow-right-icon.svg';
import { ActionPanelFiller } from '../post/style';
import {PaginationLinkPanel} from './paginationLinkPanel';

interface PaginationProps {
	maxPage: number,
}

export const Pagination = ({maxPage}: PaginationProps) => {
	const {page} = useParams();
	const location = useLocation();
	const path = location.pathname;
	const subPath = path.split('/')[1];

	return (
		<PaginationWrapper>
			<PaginationLink to={`/${subPath}/${page && Number(page) - 1}`}
			                style={Number(page) < 2 ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<ArrowLeftIcon className={Number(page) < 2 ? 'disabled' : ''} />
				<TabletOrDesktop>
					<span className={Number(page) < 2 ? 'disabled' : ''} >Prev</span>
				</TabletOrDesktop>
			</PaginationLink>
			<ActionPanelFiller />
			<PaginationLinkPanel maxPage={maxPage} subPath={subPath} />
			<ActionPanelFiller />
			<PaginationLink to={`/${subPath}/${page && Number(page) + 1}`}
			                style={Number(page) > maxPage - 1 ? {pointerEvents:'none', cursor: 'default'} : {}} >
				<TabletOrDesktop>
					<span className={Number(page) > maxPage - 1 ? 'disabled' : ''} >Next</span>
				</TabletOrDesktop>
				<ArrowRightIcon className={Number(page) > maxPage - 1 ? 'disabled' : ''} />
			</PaginationLink>
		</PaginationWrapper>
	)
}