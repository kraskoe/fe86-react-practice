import React from 'react';
import './App.css';
import {ThemeState} from './context/themeState';
import {Layout} from './containers/layout';
import {Post} from './components/post';
import image from './images/Rectangle 39.png';

function App() {
	const post = {
		'id': 0,
		'image': image,
		'text': 'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.',
		'date': '2022-10-22',
		'lesson_num': 50,
		'title': 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk',
		'author': 0
	}

	return (
		<ThemeState>
			<Layout>
				<div style={{'height': '70px'}}></div>
				<Post id={post.id} image={post.image} text={post.text} date={post.date} lesson_num={post.lesson_num} title={post.title} author={post.author} />
			</Layout>
		</ThemeState>
	);
}

export default App;
