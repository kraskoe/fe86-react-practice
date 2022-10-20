import styled from 'styled-components';

export const SearchInput = styled.input`
	display: block;
  background-color: transparent;
  color: ${(props) =>  props.theme.text};
  font-size: 2em;
  padding-left: 1em;
  outline: none;
	border: none;
	height: 100%;
  flex: 1 0 auto;
  &::placeholder {
    color: ${(props) =>  props.theme.textPale};
  }
`

export const CancelSearch = styled.button`
  padding: 1rem 2rem;
  cursor: pointer;
	background-color: transparent;
	height: 100%;
	span {
    color: ${(props) =>  props.theme.textPrimary};
    font-size: 3em;
		line-height: 1em;
  }
`

export const StyledSearch = styled.form`
	display: flex;
	justify-content: end;
	padding: 0;
	margin: 0;
  flex: 1 0 auto;
`

export const DummySearch = styled.div`
  background-color: ${(props) =>  props.theme.primary};
  flex: 1 0 auto;
`