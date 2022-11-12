import React, {FormEvent, KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {SearchCancel, DummySearch, SearchInput, SearchForm} from './style';
import searchIcon from '../../../images/search-icon.svg'
import {HeaderButton} from '../headerButton/style';
import { useLocation, useNavigate} from 'react-router-dom';

export const Search = () => {
	const [isActive, setIsActive] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const paths = ['favourites', 'popular', 'posts', 'search'];
	let query;
	const inputRef = useRef<HTMLInputElement>(null);
	const locRef = useRef('');

	useEffect(() => {
		paths.some(item => location.pathname.includes(item)) ?
			setIsActive(true) :
			setIsActive(false);
	},[location]);

	useEffect(() => {
		if (!location.pathname.includes('search')) {
			setInputValue('');
		}
	},[location]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		query = form.search.value.trim();
		if (query) {
			if (location.pathname.includes('search')) {
				navigate(`/search/1?search=${query}`);
			} else {
				locRef.current = location.pathname
			} navigate(`/search/1?search=${query}`);
		}
	}

	const handleCancel = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;
		e.preventDefault();
		if (inputRef.current?.value) {
			setInputValue('');
			if (location.pathname.includes('search')) {
				navigate(`${locRef.current}`);
			}
		}
		inputRef.current?.focus();
	}

	const handleChange = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;
		e.preventDefault();
		setInputValue(target.value);
	}

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			query = inputRef.current?.value.trim();
			if (query) {
				if (location.pathname.includes('search')) {
					navigate(`/search/1?search=${query}`);
				} else {
					locRef.current = location.pathname
				} navigate(`/search/1?search=${query}`);
			}
		}
	}

	return (
		<>
			{isActive ?
				<SearchForm autoComplete={'off'} onSubmit={handleSubmit}>
					<SearchInput placeholder='Search...' type={'search'} name={'search'} ref={inputRef} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
					<SearchCancel aria-label='Cancel Search' onClick={handleCancel}><span>&#215;</span></SearchCancel>
					<HeaderButton aria-label='Toggle Search Input' type={'submit'}><img src={searchIcon} alt='Search Icon' /></HeaderButton>
				</SearchForm> :
				<DummySearch />}
		</>
	)
}
