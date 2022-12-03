import {FunctionComponent, ReactNode} from 'react';
import {Link, useMatch} from 'react-router-dom';
import useBreadcrumbs, { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import {BreadCrumbNav, StyledBreadCrumbLink} from './style';

interface BreadCrumbLinkProps {
	children: ReactNode,
	to: string,
}

const BreadCrumbLink = ({children, to, ...props}: BreadCrumbLinkProps) => {
	const match = useMatch({
		path: to,
		end: to.length === 1,
	});

	return (
		<Link
			to={to}
			{...props}
			style={match ? {pointerEvents:'none', cursor: 'default'} : {}}
		>
			<StyledBreadCrumbLink
				className={match ? 'active' : ''}
			>
				{children}
			</StyledBreadCrumbLink>
		</Link>
	)
}

export const BreadCrumbs = () => {
	const DynamicPostId: FunctionComponent<BreadcrumbComponentProps> = ({ match }) => <span>Post #{match.params.id}</span>;

	const routes = [
		{
			path: '/',
			breadcrumb: 'Home | ',
		},
		{
			path: '/post',
			breadcrumb: null,
		},
		{
			path: '/post/:id',
			breadcrumb: DynamicPostId,
		},
		{
			path: '/posts',
			breadcrumb: null,
		},
		{
			path: '/posts/:page',
			breadcrumb: 'All posts',
		},
		{
			path: '/posts/new',
			breadcrumb: 'Create post',
		},
		{
			path: '/favourites',
			breadcrumb: 'Favourite posts',
		},
		{
			path: '/popular',
			breadcrumb: 'Popular posts',
		},
		{
			path: '/popular/:page',
			breadcrumb: null,
		},
		{
			path: '/search',
			breadcrumb: 'Search page',
		},
		{
			path: '/search/:page',
			breadcrumb: null,
		},
	];

	const breadcrumbs = useBreadcrumbs(routes);

	return (
		<BreadCrumbNav>
			{breadcrumbs.map(({ match, breadcrumb }) => (
				<BreadCrumbLink key={match.pathname} to={match.pathname}>
					{breadcrumb}
				</BreadCrumbLink>
			))}
		</BreadCrumbNav>
	)
}