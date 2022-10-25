import {BlogArea, PopularPostWrapper, PostsWrapper, SidePostsWrapper} from '../blogPage/style';
import {isBrowser} from 'react-device-detect';
import {Post} from '../../components/post';
import React from 'react';
import getPosts from '../../utils/postProvider';
import {PageTitle} from '../mainPage/style';
import {Tabs} from '../../components/tabs';


export const BlogPage = () => {
	const posts = getPosts().sort((prevPost, nextPost) => nextPost.date > prevPost.date ? 1 : 0);
	const popArray = Array.from(posts).sort((prevPost, nextPost) => nextPost.lesson_num - prevPost.lesson_num);
	const popPost = popArray[0];

	return (
		<>
			<PageTitle>Blog</PageTitle>
			<Tabs />
			<BlogArea>
				<div>
					{isBrowser &&<PopularPostWrapper>
						<Post
							mostPopular
							id={popPost.id}
							image={popPost.image}
							text={popPost.text}
							date={popPost.date}
							lesson_num={popPost.lesson_num}
							title={popPost.title}
							author={popPost.author} />
					</PopularPostWrapper>}
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
				</div>
				{isBrowser &&<SidePostsWrapper>
					{popArray.slice(1, 6).map((post) => <Post
						aside
						key={post.id}
						id={post.id}
						image={post.image}
						text={post.text}
						date={post.date}
						lesson_num={post.lesson_num}
						title={post.title}
						author={post.author} />)}
				</SidePostsWrapper>}
			</BlogArea>
		</>)
}