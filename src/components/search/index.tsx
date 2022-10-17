import styled from 'styled-components';
import React from 'react';
import {Theme} from '../../styles/theme';

const SearchButton = styled.button`
  background-color: ${(props) =>  props.theme.primaryBg};
  color: ${(props) =>  props.theme.primaryColor};
	padding: 1rem 2rem;
	font-size: 3em;
  transform: scale(-1, 1);
	cursor: pointer;
	height: 100%;
`

const SearchInput = styled.input`
	display: block;
  background-color: transparent;
  color: ${(props) =>  props.theme.primaryColor};
  font-size: 2em;
  padding-left: 1em;
  outline: none;
	border: none;
	height: 100%;
  flex: 1 0 auto;
  &::placeholder {
    color: ${(props) =>  props.theme.disabledColor};
  }
`

const CancelSearch = styled.button`
  padding: 1rem 2rem;
  cursor: pointer;
	background-color: transparent;
	height: 100%;
	span {
    color: ${(props) =>  props.theme.primaryColor};
    font-size: 3em;
		line-height: 1em;
  }
`

type SearchProps = {
	className?: string,
}

const Search = (props: SearchProps) => {
	return <form className={props.className}>
		<SearchInput placeholder="Search..." />
		<CancelSearch><span>&#215;</span></CancelSearch>
		<SearchButton>&#8981;</SearchButton>
	</form>
}

export const StyledSearch = styled(Search)`
	display: flex;
	justify-content: end;
	padding: 0;
	margin: 0;
  flex: 1 0 auto;
`