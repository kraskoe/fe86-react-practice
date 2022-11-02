import {useParams} from 'react-router-dom';
import React from 'react';
import {PaginationLink} from '../paginationLink';

export const PaginationLinkPanel = ({maxPage}: {maxPage: number}) => {
	const {page} = useParams() || '1';
	let array = Array(maxPage).fill(undefined, 0);
	array = array.map((item, index) => {
		switch (true) {
			case index === 0: return 1;
			case index === maxPage - 1: return maxPage;
			case index >= Number(page) - 3 && index < Number(page) + 2: return index + 1;
			default: return 0;
		}
	});
	let isEllipsis = false;

	return (
		<>
			{array.map((page) => {
				if (page) {
					isEllipsis = true;
					return <PaginationLink key={page}
					                       to={`/posts/${page}`}>
						<span>{page}</span>
					</PaginationLink>
				} else if (isEllipsis) {
					isEllipsis = !isEllipsis;
					return <span key={Math.floor((Math.random() * 1000) + 1000)}>...</span>
				}
				})}
		</>
	)
}