import styled from 'styled-components';

export const PostWrapper = styled.div`
	border-bottom: ${(props) => props.theme.outline} 1px solid;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

type PostProps = {
	aside?: boolean,
	mostPopular?: boolean,
}

export const PostContainer = styled.div<PostProps>`
	display: flex;
	flex-direction: ${(props) => props.aside || props.mostPopular ? 'row' : 'column'};
	gap: 2rem;
`

export const PostData = styled.div<PostProps>`
  ${(props) => props.mostPopular ? 'flex: 1 0 67%' : props.aside && 'flex: 1 0 68%'};
`

export const PostImage = styled.img<PostProps>`
	margin-bottom: 1.5rem;
	height: ${(props) => props.aside ? 96/16 : 246/16}rem;
	width: 100%;
	object-fit: cover;
	${(props) => (props.mostPopular ||props.aside) && 'flex: 0 1 30%'};
	order: ${(props) => props.aside || props.mostPopular ? 1 : 0};
`

export const DatePosted = styled.p`
	color: ${(props) => props.theme.textPale};
	font-size: 1rem;
	line-height: 1.5em;
	margin-bottom: 0.5rem;
`

export const PostTitle = styled.h3`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 600;
	font-size: ${18/16}rem;
	line-height: 1.5em;
	margin-bottom: ${28/16}rem;
`

export const PopularPostTitle = styled.h2`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 700;
	font-size: ${32/16}rem;
	line-height: 1.5em;
	margin-bottom: ${24/16}rem;
`
export const PostText = styled.p`
  color: ${(props) => props.theme.textPale};
	font-size: 1rem;
	line-height: 1.5em;
	margin-bottom: ${28/16}rem;
`

export const PostActionsWrapper = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;
	margin-bottom: ${42/16}rem;
`

export const PostPopularity = styled.p`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 700;
	font-size: 1rem;
	line-height: 1.5em;
	padding: 0 0.5rem;
`

type ActionButtonProps = {
	error?: boolean,
}

export const ActionButton = styled.button<ActionButtonProps>`
	padding: 1rem;
  background-color: ${(props) => props.theme.mainBg};
	
  &:hover {
		background-color: ${(props) => props.error ? props.theme.error : props.theme.primaryBg};
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
  }
`

export const ActionPanelFiller = styled.div`
	flex: 1 0 auto;
`