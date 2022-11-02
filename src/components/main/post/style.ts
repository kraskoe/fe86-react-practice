import styled from 'styled-components';

export const PostWrapper = styled.div`
	border-bottom: ${(props) => props.theme.outline} 1px solid;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

PostWrapper.displayName = 'PostWrapper';

type PostProps = {
	aside?: boolean,
	mostPopular?: boolean,
}

export const PostContainer = styled.div<PostProps>`
	display: flex;
	flex-direction: ${(props) => props.aside || props.mostPopular ? 'row' : 'column'};
	gap: 2rem;
`
PostContainer.displayName = 'PostContainer';

export const PostData = styled.div<PostProps>`
  ${(props) => props.mostPopular ? 'flex: 1 0 67%' : props.aside && 'flex: 1 0 68%'};
`
PostData.displayName = 'PostData';

export const PostImage = styled.img<PostProps>`
	margin-bottom: 1.5rem;
	height: ${(props) => props.aside ? 96/16 : 246/16}rem;
	width: 100%;
	object-fit: cover;
	${(props) => (props.mostPopular ||props.aside) && 'flex: 0 1 30%'};
	order: ${(props) => props.aside || props.mostPopular ? 1 : 0};
	overflow: hidden;
`
PostImage.displayName = 'PostImage';

export const DatePosted = styled.p`
	color: ${(props) => props.theme.textPale};
	font-size: 1rem;
	line-height: 1.5em;
	margin-bottom: 0.5rem;
`
DatePosted.displayName = 'DatePosted';

export const PostTitle = styled.h3`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 600;
	font-size: ${18/16}rem;
	line-height: 1.5em;
	margin-bottom: ${28/16}rem;
`
PostTitle.displayName = 'PostTitle';

export const PopularPostTitle = styled.h2`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 700;
	font-size: ${32/16}rem;
	line-height: 1.5em;
	margin-bottom: ${24/16}rem;
`
PopularPostTitle.displayName = 'PopularPostTitle';

export const PostText = styled.p`
  color: ${(props) => props.theme.textPale};
	font-size: 1rem;
	line-height: 1.5em;
	margin-bottom: ${28/16}rem;
`
PostText.displayName = 'PostText';

export const PostActionsWrapper = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;
	margin-bottom: ${42/16}rem;

  @media (min-width: ${768/16}rem) {
    flex-wrap: wrap;
  }
`
PostActionsWrapper.displayName = 'PostActionsWrapper';

export const PostPopularity = styled.p`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 700;
	font-size: 1rem;
	line-height: 1.5em;
	padding: 0 0.5rem;
`
PostPopularity.displayName = 'PostPopularity';

type ActionButtonProps = {
	error?: boolean,
}

export const ActionButton = styled.button<ActionButtonProps>`
	padding: 1rem;
  background-color: ${(props) => props.theme.mainBg};
	display: flex;
  justify-content: center;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	font-weight: 600;
	font-size: ${18/16}rem;
	line-height: 1em;
  color: ${(props) => props.theme.textSecondary};
	height: ${56/16}rem;

  &:hover {
		background-color: ${(props) => props.error ? props.theme.error : props.theme.primaryBg};
  	color: ${(props) => props.theme.textPrimary};
	}
	
	
	svg {
		width: 1.5rem;
		height: 1.5rem;
		display: block;
		fill: ${(props) => props.theme.textSecondary};
	}

  &:hover svg {
    fill: ${(props) => props.theme.textPrimary};
	}
	
	&:disabled {
    background-color: ${(props) => props.theme.secondary};
  }

  &:disabled svg {
    fill: ${(props) => props.theme.textPale};
  }
	
	@media (min-width: ${768/16}rem) {
    padding: 1rem 1.5rem;
		width: auto;
  }
`
ActionButton.displayName = 'ActionButton';

export const ActionPanelFiller = styled.div`
	flex: 1 0 auto;
`
ActionPanelFiller.displayName = 'ActionPanelFiller';
