import { ReactNode} from 'react';
import {Link, useMatch} from 'react-router-dom';
import { Tab } from '../style';

interface TabLinkProps {
	children: ReactNode,
	to: string,
}

export const TabLink = ({children, to, ...props}: TabLinkProps) => {
	const match = useMatch({
		path: to,
		end: to.length === 1,
	});

	return (
		<Link
			to={to}
			{...props}
		>
			<Tab
				className={match ? 'active' : ''}
			>
				{children}
			</Tab>
		</Link>
	)
}