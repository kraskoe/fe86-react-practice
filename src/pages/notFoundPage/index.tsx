import {Link} from 'react-router-dom';
import {StyledNotFoundPage} from './style';

export const NotFoundPage = () => {
	return (
		<StyledNotFoundPage>
			<p>Page not found. Return to <Link to={'/'}>Main page</Link></p>
		</StyledNotFoundPage>
	)
}