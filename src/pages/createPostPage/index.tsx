import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {PageTitle} from '../mainPage/style';
import React from 'react';
import {PostForm} from '../../components/postForm';

export const CreatePostPage = () => {

	return <>
		<BreadCrumbs />
		<PageTitle>Add post</PageTitle>
		<PostForm />
	</>
}