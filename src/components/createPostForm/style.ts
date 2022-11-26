import styled from 'styled-components';

export const NewPostForm = styled.form`
  padding: ${24/16}rem 0;

  label:last-of-type div:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${768/16}rem) {
    padding: ${40/16}rem 0;
  }
`
NewPostForm.displayName = 'NewPostForm';

export const InputFlexWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
  margin-top: 1rem;

  @media (min-width: ${1024/16}rem) {
    flex-direction: row;
  }
`
InputFlexWrapper.displayName = 'InputFlexWrapper';

export const TextArea = styled.textarea`
	background-color: ${(props) => props.theme.textPrimary};
  color: ${(props) => props.theme.textInput};
	padding: ${18/16}rem ${20/16}rem;
	flex: 1 0 auto;
	outline: none;
	border: transparent 2px solid;
	font-size: 1rem;
	resize: none;
	min-height: 7rem;
  font-family: 'Inter', sans-serif;

  &::placeholder {
		font-size: 1rem;
    color: ${(props) => props.theme.textPale};
    font-family: 'Inter', sans-serif;
  }
`
TextArea.displayName = 'TextArea';

export const CancelButton = styled.button`
  background-color: ${(props) => props.theme.outline};
  color: ${(props) => props.theme.textInput};
	padding: 1rem;
	width: 100%;
	font-size: ${18/16}rem;
	font-weight: 600;
	margin-bottom: 0;

  &:hover,
	&:active {
    background-color: ${(props) => props.theme.textPale};
  }

  &:disabled {
    background-color: ${(props) => props.theme.outline};
    color: ${(props) => props.theme.textPale};
    cursor: default;
  }
`
CancelButton.displayName = 'CancelButton';

export const FileInput = styled.input`
	background-color: ${(props) => props.theme.textPrimary};
	color: ${(props) => props.theme.textInput};
	padding: ${18/16}rem ${20/16}rem;
	flex: 1 0 auto;
	outline: none;
	border: transparent 2px solid;
	font-size: 1rem;
	cursor: pointer;
  font-family: 'Inter', sans-serif;

  &::-webkit-file-upload-button {
		display: none;
	}
	
	&::placeholder {
		font-size: 1rem;
    color: ${(props) => props.theme.textPale};
    font-family: 'Inter', sans-serif;
  }
`
FileInput.displayName = 'FileInput';