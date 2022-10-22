import styled from 'styled-components';

export const PostWrapper = styled.div`
	
`

export const PostImage = styled.img`
	margin-bottom: 1.5rem;
	height: ${246/16}rem;
	width: 100%;
	object-fit: cover;
`

export const DatePosted = styled.p`
	color: ${(props) => props.theme.textPale};
	font-size: 1rem;
	line-height: 1.5rem;
	margin-bottom: 0.5rem;
`

export const PostTitle = styled.h3`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 600;
	font-size: ${18/16}rem;
	line-height: ${28/16}rem;
	margin-bottom: ${28/16}rem;
`

export const PostActionsWrapper = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;
`

export const PostPopularity = styled.p`
  color: ${(props) => props.theme.textSecondary};
	font-weight: 700;
	font-size: 1rem;
	line-height: 1.5rem;
`

type ActionButtonProps = {
	error?: boolean,
}

export const ActionButton = styled.button<ActionButtonProps>`
	padding: 1rem 2rem;

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
`

export const ActionPanelFiller = styled.div`
	flex: 1 0 auto;
`