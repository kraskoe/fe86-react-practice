import getPosts from '../../utils/postProvider';
import {PostsWrapper} from '../blogPage/style';
import {Post} from '../../components/post';
import React from 'react';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/tabs';

export const FavoritesPage = () => {
	const posts = getPosts().filter(post => post.lesson_num >= 200).sort((prevPost, nextPost) => nextPost.date > prevPost.date ? 1 : 0);

	return (
		<>
			<PageTitle>Favourites</PageTitle>
			<Tabs />
			<PostsWrapper>
				{posts.map((post) => <Post
					key={post.id}
					id={post.id}
					image={post.image}
					text={post.text}
					date={post.date}
					lesson_num={post.lesson_num}
					title={post.title}
					author={post.author} />)}
			</PostsWrapper>
		</>
	)
}