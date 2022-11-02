import styled from 'styled-components';

export const BlogArea = styled.div`
	display: grid;
  grid-template-columns: 1fr;
	gap: 2rem;
	width: 100%;

  @media (min-width: ${1024/16}rem) {
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;
  }
`

export const PostsWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	gap: 2rem;
	
	@media (min-width: ${768/16}rem) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
	}
`

export const SidePostsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
`

export const PopularPostWrapper = styled.div`
	margin-bottom: 2.5rem;
`
