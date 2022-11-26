import {CancelButton, FileInput, InputFlexWrapper, NewPostForm, TextArea} from './style';
import {AuthButton, AuthError, AuthLabel, AuthTextInput} from '../auth/shared/style';
import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../store/hooks/hooks';
import {createNewPost} from '../../store/slices/posts/newPostSlice';

export const CreatePostForm = () => {
	const initialFormState = {
		ready: false,
		pending: false,
		postTitle: '',
		text: '',
	}
	const initialErrorState = {
		postTitle: '',
		text: '',
		image: '',
		serverError: '',
	}
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(initialErrorState);
	const {postTitle, text} = formState;
	const navigate = useNavigate();
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const dispatch = useAppDispatch();

	const isFormReady = () => {
		if (formState.postTitle.trim() &&
			formState.text.trim() &&
			uploadedFile &&
			!errorState.postTitle &&
			!errorState.text &&
			!errorState.image) {
			setFormState({...formState, ready: true})
		} else {
			setFormState({...formState, ready: false})
		}
	}

	useEffect(isFormReady,[formState.postTitle, formState.text, uploadedFile]);

	const handleUpload = async (formData: FormData) => {
		setFormState({...formState, pending: true});
		const resultAction = await dispatch(createNewPost(formData))
		if (createNewPost.fulfilled.match(resultAction)) {
			const id = resultAction.payload?.id;
			setFormState({...formState, pending: false});
			navigate(`/post/${id}`);
		} else {
			setErrorState({...errorState , postTitle: resultAction.error.message || 'Something went wrong'});
			setFormState({...formState, pending: false});
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
		if (formState.ready) {
			const form = event.target as HTMLFormElement;
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
		<NewPostForm onSubmit={handleSubmit} encType={'multipart/form-data'}>
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
								name={'image'}
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
					/>
				</div>
			</AuthLabel>
			<InputFlexWrapper>
				<CancelButton
					type={'reset'}
					disabled={formState.pending}
					onClick={handleCancel}>Cancel</CancelButton>
				<AuthButton
					type={'submit'}
					disabled={!formState.ready || formState.pending}
				>Add post</AuthButton>
			</InputFlexWrapper>
		</NewPostForm>
	</>
}