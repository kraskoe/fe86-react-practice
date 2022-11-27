import {MouseEvent, useState} from 'react';
import {UserPostMenuWrapper} from './style';
import {ActionButton} from '../style';
import {ReactComponent as DeleteIcon} from '../../../../images/recycle_bin-icon.svg';
import {ReactComponent as UpdateIcon} from '../../../../images/update-icon.svg';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks/hooks';
import {deletePost} from '../../../../store/slices/posts/userPostSlice';
import {useNavigate} from 'react-router-dom';

interface IUserPostMenuProps {
	postId: number,
}

export  const UserPostMenu = (props: IUserPostMenuProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);

	const handleUpdatePost = () => {
		navigate(`/post/${props.postId}/update`);
	}

	const handleDeletePost = async (event: MouseEvent<HTMLButtonElement>) => {
		setIsDisabled(true);
		event.preventDefault();
		const resultAction = await dispatch(deletePost(props.postId))
		if (deletePost.fulfilled.match(resultAction)) {
			setIsDisabled(false);
			window.location.reload();
		} else {
			console.log(`Rejected: ${resultAction}`);
			setIsDisabled(false);
		}
	}

	return <>
		<UserPostMenuWrapper>
			<ActionButton
				title={'Update post'}
				disabled={isDisabled}
				onClick={handleUpdatePost}
			><UpdateIcon /></ActionButton>
			<ActionButton
				error
				title={'Delete post'}
				disabled={isDisabled}
				onClick={handleDeletePost}
			><DeleteIcon /></ActionButton>
		</UserPostMenuWrapper>
	</>
}