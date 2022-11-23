import {CancelButton, FileInput, InputFlexWrapper, NewPostForm, TextArea} from './style';
import {AuthButton, AuthError, AuthLabel, AuthTextInput} from '../auth/shared/style';
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {createNewPost} from '../../store/slices/posts/newPostSlice';

export const CreatePostForm = () => {
	const initialFormState = {
		ready: false,
		postTitle: '',
		text: '',
	}
	const initialErrorState = {
		error: false,
		postTitle: '',
		text: '',
		image: '',
	}
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const {postTitle, text} = formState;
	const navigate = useNavigate();
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const textRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const access = useAppSelector(state => state.auth?.authData?.token?.access) || '';

	const isFormReady = () => {
		if (titleRef.current?.value.trim() && textRef.current?.value.trim() && uploadedFile && !errorState.error) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}
	const isError = () => {
		if (errorState.text || errorState.image || errorState.postTitle) {
			setErrorState({...errorState, error: true})
		} else {
			setErrorState({...errorState, error: false})
		}
	}

	useEffect(isFormReady,[titleRef.current?.value, textRef.current?.value, uploadedFile]);
	useEffect(isError,[errorState.text, errorState.image, errorState.postTitle]);

	const handleUpload = async (formData: FormData) => {
		const resultAction = await dispatch(createNewPost({formData, access}))
		if (createNewPost.fulfilled.match(resultAction)) {
			console.log(resultAction.payload);
		} else {
			if (resultAction.payload) {
				setErrorState({...errorState , postTitle: resultAction.payload.title || 'Something went wrong', text: resultAction.payload.text || '', image: resultAction.payload.image || ''});
			} else setErrorState({...errorState , postTitle: 'Something went wrong'});
		}
	}

	const handleCancel = (event: FormEvent) => {
		event.preventDefault();
		navigate('/');
	}

	const handleFileChange = (event: FormEvent) => {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files[0]) {
			if (!fileInput.files[0].type.includes('image/')) {
				setErrorState({...errorState, image: 'Wrong file format.'});
			} else setErrorState({...errorState, image: ''});
		}

		fileInput.files && fileInput.files[0] && setUploadedFile(fileInput.files[0]);
	}

	const handleInputChange = (event: FormEvent) => {
		const { name, value } = event.target as HTMLInputElement;

		event.preventDefault();

		if (name === 'postTitle') {
			setErrorState({...errorState, postTitle: ''})
		}

		if (name === 'text') {
			setErrorState({...errorState, text: ''})
		}

		setFormState({...formState, [name]: value});
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.log(event);
		if (formState.ready) {
			const form = event.target as HTMLFormElement;
			// const formData = new FormData(form);
			const formData = new FormData();
			formData.append('text', form.text.value);
			formData.append('lesson_num', String(86));
			formData.append('title', form.postTitle.value);
			uploadedFile && formData.append('image', uploadedFile);

			// for (const pair of formData.entries()) {
			// 	console.log(pair[0]+ ', ' + pair[1]);
			// }
			// console.log(formData);
			handleUpload(formData);
		}
	}

	return <>
		<NewPostForm onSubmit={handleSubmit}>
			<InputFlexWrapper>
				<div style={{flex: '1 0 48%'}}>
					<AuthLabel>
						<div>Title{errorState.postTitle && <AuthError>{errorState.postTitle}</AuthError>}</div>
						<div style={{display: 'flex'}}>
							<AuthTextInput
								type={'text'}
								maxLength={150}
								placeholder={'Type title here'}
								name={'postTitle'}
								value={postTitle}
								onChange={handleInputChange}
								ref={titleRef}
							/>
						</div>
					</AuthLabel>
				</div>
				<div style={{flex: '1 0 48%'}}>
					<AuthLabel>
						<div>Image{errorState.image && <AuthError>{errorState.image}</AuthError>}</div>
						<div style={{display: 'flex'}}>
							<FileInput
								type={'file'}
								accept={'image/*,.png,.jpg,.gif,.web,.webp'}
								onChange={handleFileChange}
							/>
						</div>
					</AuthLabel>
				</div>
			</InputFlexWrapper>
			<AuthLabel>
				<div  style={{marginTop: '1rem'}}>Text{errorState.text && <AuthError>{errorState.text}</AuthError>}</div>
				<div style={{display: 'flex'}}>
					<TextArea
						maxLength={150}
						placeholder={'Type description here'}
						name={'text'}
						value={text}
						onChange={handleInputChange}
						ref={textRef}
					/>
				</div>
			</AuthLabel>
			<InputFlexWrapper>
				<CancelButton
					type={'reset'}
					onClick={handleCancel}>Cancel</CancelButton>
				<AuthButton
					type={'submit'}
					disabled={!formState.ready}
				>Add post</AuthButton>
			</InputFlexWrapper>
		</NewPostForm>
	</>
}