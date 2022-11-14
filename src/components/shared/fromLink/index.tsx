import {Link, useLocation} from 'react-router-dom';
import {ReactNode} from 'react';

interface FromLinkProps {
	children: ReactNode,
	to: string,
}

export const FromLink = ({children, to, ...props}: FromLinkProps) => {
	const location = useLocation();

	return (
		<Link
			to={to}
			state={{from: location.pathname}}
			{...props}>
			{children}
		</Link>
	)
}