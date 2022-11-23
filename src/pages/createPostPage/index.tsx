import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {PageTitle} from '../mainPage/style';
import React from 'react';
import {CreatePostForm} from '../../components/createPostForm';

export const CreatePostPage = () => {

	return <>
		<BreadCrumbs />
		<PageTitle>Add post</PageTitle>
		<CreatePostForm />
	</>
}