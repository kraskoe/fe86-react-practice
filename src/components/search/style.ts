import styled from 'styled-components';

export const SearchInput = styled.input`
	display: block;
  background-color: transparent;
  color: ${(props) =>  props.theme.text};
  font-size: 1em;
  padding: 0 1em;
  outline: none;
	border: none;
	height: 100%;
  flex: 1 0 auto;
	width: 5rem;
  &::placeholder {
    color: ${(props) =>  props.theme.textPale};
  }
`

export const CancelSearch = styled.button`
  padding: 1rem 2rem;
  cursor: pointer;
	background-color: transparent;
	height: 100%;
	display: flex;
  justify-content: center;
	align-items: center;
	
	span {
    color: ${(props) =>  props.theme.textPrimary};
    font-size: 3rem;
		line-height: 1rem;
  }
`

export const StyledSearch = styled.form`
	display: flex;
	justify-content: end;
	align-items: center;
	padding: 0;
	margin: 0;
  flex: 1 0 auto;
`

export const DummySearch = styled.div`
  background-color: ${(props) =>  props.theme.primary};
  flex: 1 0 auto;
`