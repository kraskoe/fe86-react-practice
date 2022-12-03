import {CancelButton, FileInput, InputFlexWrapper, StyledFileInput, StyledPostForm, TextArea} from './style';
import {AuthButton, AuthError, AuthLabel, AuthTextInput} from '../auth/shared/style';
import React, {FormEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks/hooks';
import {createNewPost, updatePost} from '../../store/slices/posts/userPostSlice';
import {fetchPost} from '../../store/slices/posts/postSlice';
import {Spinner} from '../main/spinner';
import {PostProps} from '../../store/slices/posts/types';

interface IPostFormProps {
	update?: boolean,
}

export const PostForm = (props: IPostFormProps) => {
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
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [fileDataURL, setFileDataURL] = useState<string>();
	const {postTitle, text} = formState;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const author = useAppSelector(state => state.auth.profileData.user?.id);
	const postData = useAppSelector(state => state.post);
	const {id} = useParams();
	const inputRef = useRef<HTMLInputElement>(null);

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
	useEffect(() => {
		//--- 2nd variant using fileReader ---
		// const fileReader = new FileReader();
		// let isCancel = false;
		if (uploadedFile) {
			setFileDataURL(URL.createObjectURL(uploadedFile));
			// fileReader.onload = (e: any) => {
			// 	const { result } = e.target;
			// 	if (result && !isCancel) {
			// 		setFileDataURL(result)
			// 	}
			// }
			// fileReader.readAsDataURL(uploadedFile);
		}
		// return () => {
		// 	isCancel = true;
		// 	if (fileReader && fileReader.readyState === 1) {
		// 		fileReader.abort();
		// 	}
		// }
	}, [uploadedFile]);

	useEffect(() => {
		props.update && id && dispatch(fetchPost(id))
			.then(data => data.payload as PostProps)
			.then(data => {
				setFormState({...formState, postTitle: data?.title, text: data?.text});
				return data
			})
			.then(data => {
				const url = data.image.replace('https://tms-studapi-dev.s3.amazonaws.com', '');
				return fetch(url)
					.then(response => response.blob())
					.then(blob => new File([blob], url.replace('/media/', '')))
			})
			.then(file => setUploadedFile(file))
			.catch(error => console.log(error));
	}, [id]);

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		inputRef.current?.click();
	}

	const handleUpload = async (formData: FormData) => {
		setFormState({...formState, pending: true});
		if (props.update && id) {
			const resultAction = await dispatch(updatePost({id, formData}))
			if (updatePost.fulfilled.match(resultAction)) {
				setFormState({...formState, pending: false});
				navigate(`/post/${id}`);
			} else {
				setErrorState({...errorState , postTitle: resultAction.error.message || 'Something went wrong'});
				setFormState({...formState, pending: false});
			}
		} else {
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

			if (props.update && author) {
				formData.append('author', author.toString());
			}

			// for (const pair of formData.entries()) {
			// 	console.log(pair[0]+ ', ' + pair[1]);
			// }
			// console.log(formData);
			handleUpload(formData);
		}
	}

	return <>
		{postData.error && <h2>An error occurred: {postData.error}</h2>}
		{!props.update || postData.status === 'succeeded' ?
			<>
				<StyledPostForm onSubmit={handleSubmit} encType={'multipart/form-data'}>
					{fileDataURL && <div style={{display: 'flex', justifyContent: 'center', maxHeight: '20rem'}}>
						<img src={fileDataURL} alt={''} style={{overflow: 'hidden', objectFit: 'cover'}} />
					</div>
					}
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
									<StyledFileInput onClick={handleClick}>
										{uploadedFile ? uploadedFile.name : 'Choose file'}
									</StyledFileInput>
									<FileInput
										type={'file'}
										name={'image'}
										accept={'image/*,.png,.jpg,.gif,.web,.webp'}
										onChange={handleFileChange}
										ref={inputRef}
									/>
								</div>
							</AuthLabel>
						</div>
					</InputFlexWrapper>
					<AuthLabel>
						<div style={{marginTop: '1rem'}}>Text{errorState.text && <AuthError>{errorState.text}</AuthError>}</div>
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
						>{props.update ? 'Update post' : 'Add post'}</AuthButton>
					</InputFlexWrapper>
				</StyledPostForm>
			</> :
			<Spinner/>
		}
	</>
}