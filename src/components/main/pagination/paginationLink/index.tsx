import {CSSProperties, ReactNode} from 'react';
import {Link, useMatch} from 'react-router-dom';
import {PaginationLinkContainer} from './style';

interface PaginationLinkProps {
	children: ReactNode,
	to: string,
	style?: CSSProperties,
}

export const PaginationLink = ({children, to, ...props}: PaginationLinkProps) => {
	const match = useMatch(to);

	return (
		<Link
			to={to}
			{...props}
		>
			<PaginationLinkContainer
				className={match ? 'active' : ''}
			>
				{children}
			</PaginationLinkContainer>
		</Link>
	)
}