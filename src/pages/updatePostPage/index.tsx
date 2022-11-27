import {BreadCrumbs} from '../../components/main/breadCrumbs';
import {PageTitle} from '../mainPage/style';
import React from 'react';
import {PostForm} from '../../components/postForm';

export const UpdatePostPage = () => {

	return <>
		<BreadCrumbs />
		<PageTitle>Update post</PageTitle>
		<PostForm update />
	</>
}