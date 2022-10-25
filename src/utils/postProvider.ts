import {PostProps} from '../components/post';

// useEffect(() => {fetch('https://studapi.teachmeskills.by/blog/posts/')
// 	.then(data => {
// 		return data.json();
// 	})
// 	.then(posts => {
// 		console.log(posts);
// 	});}, [])

const textFiller = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aliquam architecto consectetur dolore eos eveniet incidunt iure magni molestias neque nisi obcaecati provident quibusdam quis rem sequi sint sit sunt totam, ut vel veniam vero. Amet beatae harum iusto, laborum perferendis quisquam repellat temporibus voluptate. Ab ad animi beatae commodi cupiditate debitis delectus dolore dolorem doloremque eius enim error esse facere incidunt inventore iste laboriosam maiores minus molestias nihil optio perferendis possimus provident quia quidem quos recusandae, reiciendis reprehenderit sapiente sequi sint temporibus ullam veniam veritatis voluptas voluptate voluptatum? Autem blanditiis consectetur culpa cum dignissimos dolorem ducimus eius eos eveniet id illo in laudantium magni maiores minus mollitia necessitatibus obcaecati officiis optio quas quia quod rerum totam vel, velit? Ad aspernatur deleniti dicta ipsum maxime, nisi nulla odit ratione veritatis? Atque eaque necessitatibus veritatis. Aliquam amet blanditiis consectetur culpa cupiditate dignissimos doloremque, doloribus earum enim exercitationem hic illo in ipsa ipsam labore libero molestiae molestias nam necessitatibus, nostrum odio officiis omnis placeat quasi quidem quod quos ratione reprehenderit sed tenetur unde ut vel voluptas. Alias at, cum dolores earum eum excepturi facere, facilis in iste labore, nisi omnis praesentium quis tenetur voluptatum. Alias aliquam animi beatae culpa doloremque illo minima molestias placeat sequi! Ab accusamus adipisci alias assumenda commodi consequuntur corporis delectus deserunt doloribus iste laudantium natus nostrum nulla omnis pariatur perferendis porro provident quasi, quo recusandae sint temporibus ut velit. Cupiditate dolorem eum impedit molestias necessitatibus nulla perspiciatis provident quae quasi, reprehenderit rerum sint? At eligendi ex necessitatibus non porro rem voluptate. A accusamus animi aspernatur delectus dolor eaque error facilis fugit harum hic id incidunt itaque magnam magni nihil, non odit, omnis quibusdam quisquam rem, repudiandae sunt tempora tenetur ullam voluptates. Ab amet beatae ea, earum eum iste iusto labore natus necessitatibus officiis quas quia quibusdam voluptates?\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aliquam architecto consectetur dolore eos eveniet incidunt iure magni molestias neque nisi obcaecati provident quibusdam quis rem sequi sint sit sunt totam, ut vel veniam vero. Amet beatae harum iusto, laborum perferendis quisquam repellat temporibus voluptate. Ab ad animi beatae commodi cupiditate debitis delectus dolore dolorem doloremque eius enim error esse facere incidunt inventore iste laboriosam maiores minus molestias nihil optio perferendis possimus provident quia quidem quos recusandae, reiciendis reprehenderit sapiente sequi sint temporibus ullam veniam veritatis voluptas voluptate voluptatum? Autem blanditiis consectetur culpa cum dignissimos dolorem ducimus eius eos eveniet id illo in laudantium magni maiores minus mollitia necessitatibus obcaecati officiis optio quas quia quod rerum totam vel, velit? Ad aspernatur deleniti dicta ipsum maxime, nisi nulla odit ratione veritatis? Atque eaque necessitatibus veritatis. Aliquam amet blanditiis consectetur culpa cupiditate dignissimos doloremque, doloribus earum enim exercitationem hic illo in ipsa ipsam labore libero molestiae molestias nam necessitatibus, nostrum odio officiis omnis placeat quasi quidem quod quos ratione reprehenderit sed tenetur unde ut vel voluptas. Alias at, cum dolores earum eum excepturi facere, facilis in iste labore, nisi omnis praesentium quis tenetur voluptatum. Alias aliquam animi beatae culpa doloremque illo minima molestias placeat sequi! Ab accusamus adipisci alias assumenda commodi consequuntur corporis delectus deserunt doloribus iste laudantium natus nostrum nulla omnis pariatur perferendis porro provident quasi, quo recusandae sint temporibus ut velit. Cupiditate dolorem eum impedit molestias necessitatibus nulla perspiciatis provident quae quasi, reprehenderit rerum sint? At eligendi ex necessitatibus non porro rem voluptate. A accusamus animi aspernatur delectus dolor eaque error facilis fugit harum hic id incidunt itaque magnam magni nihil, non odit, omnis quibusdam quisquam rem, repudiandae sunt tempora tenetur ullam voluptates. Ab amet beatae ea, earum eum iste iusto labore natus necessitatibus officiis quas quia quibusdam voluptates?\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aliquam architecto consectetur dolore eos eveniet incidunt iure magni molestias neque nisi obcaecati provident quibusdam quis rem sequi sint sit sunt totam, ut vel veniam vero. Amet beatae harum iusto, laborum perferendis quisquam repellat temporibus voluptate. Ab ad animi beatae commodi cupiditate debitis delectus dolore dolorem doloremque eius enim error esse facere incidunt inventore iste laboriosam maiores minus molestias nihil optio perferendis possimus provident quia quidem quos recusandae, reiciendis reprehenderit sapiente sequi sint temporibus ullam veniam veritatis voluptas voluptate voluptatum? Autem blanditiis consectetur culpa cum dignissimos dolorem ducimus eius eos eveniet id illo in laudantium magni maiores minus mollitia necessitatibus obcaecati officiis optio quas quia quod rerum totam vel, velit? Ad aspernatur deleniti dicta ipsum maxime, nisi nulla odit ratione veritatis? Atque eaque necessitatibus veritatis. Aliquam amet blanditiis consectetur culpa cupiditate dignissimos doloremque, doloribus earum enim exercitationem hic illo in ipsa ipsam labore libero molestiae molestias nam necessitatibus, nostrum odio officiis omnis placeat quasi quidem quod quos ratione reprehenderit sed tenetur unde ut vel voluptas. Alias at, cum dolores earum eum excepturi facere, facilis in iste labore, nisi omnis praesentium quis tenetur voluptatum. Alias aliquam animi beatae culpa doloremque illo minima molestias placeat sequi! Ab accusamus adipisci alias assumenda commodi consequuntur corporis delectus deserunt doloribus iste laudantium natus nostrum nulla omnis pariatur perferendis porro provident quasi, quo recusandae sint temporibus ut velit. Cupiditate dolorem eum impedit molestias necessitatibus nulla perspiciatis provident quae quasi, reprehenderit rerum sint? At eligendi ex necessitatibus non porro rem voluptate. A accusamus animi aspernatur delectus dolor eaque error facilis fugit harum hic id incidunt itaque magnam magni nihil, non odit, omnis quibusdam quisquam rem, repudiandae sunt tempora tenetur ullam voluptates. Ab amet beatae ea, earum eum iste iusto labore natus necessitatibus officiis quas quia quibusdam voluptates?\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aliquam architecto consectetur dolore eos eveniet incidunt iure magni molestias neque nisi obcaecati provident quibusdam quis rem sequi sint sit sunt totam, ut vel veniam vero. Amet beatae harum iusto, laborum perferendis quisquam repellat temporibus voluptate. Ab ad animi beatae commodi cupiditate debitis delectus dolore dolorem doloremque eius enim error esse facere incidunt inventore iste laboriosam maiores minus molestias nihil optio perferendis possimus provident quia quidem quos recusandae, reiciendis reprehenderit sapiente sequi sint temporibus ullam veniam veritatis voluptas voluptate voluptatum? Autem blanditiis consectetur culpa cum dignissimos dolorem ducimus eius eos eveniet id illo in laudantium magni maiores minus mollitia necessitatibus obcaecati officiis optio quas quia quod rerum totam vel, velit? Ad aspernatur deleniti dicta ipsum maxime, nisi nulla odit ratione veritatis? Atque eaque necessitatibus veritatis. Aliquam amet blanditiis consectetur culpa cupiditate dignissimos doloremque, doloribus earum enim exercitationem hic illo in ipsa ipsam labore libero molestiae molestias nam necessitatibus, nostrum odio officiis omnis placeat quasi quidem quod quos ratione reprehenderit sed tenetur unde ut vel voluptas. Alias at, cum dolores earum eum excepturi facere, facilis in iste labore, nisi omnis praesentium quis tenetur voluptatum. Alias aliquam animi beatae culpa doloremque illo minima molestias placeat sequi! Ab accusamus adipisci alias assumenda commodi consequuntur corporis delectus deserunt doloribus iste laudantium natus nostrum nulla omnis pariatur perferendis porro provident quasi, quo recusandae sint temporibus ut velit. Cupiditate dolorem eum impedit molestias necessitatibus nulla perspiciatis provident quae quasi, reprehenderit rerum sint? At eligendi ex necessitatibus non porro rem voluptate. A accusamus animi aspernatur delectus dolor eaque error facilis fugit harum hic id incidunt itaque magnam magni nihil, non odit, omnis quibusdam quisquam rem, repudiandae sunt tempora tenetur ullam voluptates. Ab amet beatae ea, earum eum iste iusto labore natus necessitatibus officiis quas quia quibusdam voluptates?\n';

// const post = {
// 	'id': 0,
// 	'image': image,
// 	'text': 'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.',
// 	'date': '2022-10-22',
// 	'lesson_num': 50,
// 	'title': 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk',
// 	'author': 0
// }

function getDaysInMonth(month: number) {
	switch (month) {
		case 2: return 28;
		case 1 || 3 || 5 || 7 || 8 || 10 || 12: return 31;
		default: return 30;
	}
}

function getRandomDate() {
	const year = Math.floor(Math.random()*2) + 2021;
	const month = Math.floor(Math.random()*12) + 1;
	const day = Math.floor(Math.random()*getDaysInMonth(month)) + 1;
	const date = new Date(year, month, day);

	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

const populatePost = (function() {
	let id = 0;

	return function(): PostProps {return {
		id: (id++).toString(),
		image: `https://picsum.photos/id/${id+50}/246/352`,
		text: textFiller.slice(0, Math.floor(Math.random()*400)+100),
		date: getRandomDate(),
		lesson_num: Math.floor(Math.random()*500),
		title: textFiller.slice(0, Math.floor(Math.random()*60)+30),
		author: 0,
	}}
})()

export default function getPosts() {
	const posts = Array(30).fill({}).map(populatePost);
	return posts;
}