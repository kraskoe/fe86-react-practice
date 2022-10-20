import React, {useState} from 'react';
import { HeaderButton } from '../button';
import {CancelSearch, DummySearch, SearchInput, StyledSearch} from './style';
import searchIcon from '../../images/search-icon.svg'

export const Search = () => {
	const [isDummySearch, toggleDummySearch] = useState(true);

	const toggleSearch = () => {
		toggleDummySearch(!isDummySearch);
	}

	return (
		<>
			{isDummySearch ?
				<DummySearch /> :
				<StyledSearch>
					<SearchInput placeholder="Search..." />
					<CancelSearch><span>&#215;</span></CancelSearch>
				</StyledSearch>}
			<HeaderButton aria-label="Toggle Search Input"><img src={searchIcon} alt='Search Icon' onClick={toggleSearch} /></HeaderButton>
		</>
	)
}
