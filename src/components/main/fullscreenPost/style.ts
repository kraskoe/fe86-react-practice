import styled from 'styled-components';

export const FullscreenPostTitle = styled.h1`
	font-weight: 700;
	font-size: ${32/16}rem;
	line-height: 1.5em;
	color: ${(props) => props.theme.textSecondary};
	margin-bottom: ${36/16}rem;
	word-wrap: break-word;
	
	@media (min-width: ${768/16}) {
    font-size: ${56/16}rem;
    margin-bottom: ${48/16}rem;
  }
`

FullscreenPostTitle.displayName = 'FullscreenPostTitle';

export const FullscreenPostImage = styled.img`
	width: 100%;
	height: ${518/16}rem;
	display: block;
	object-fit: cover;
  margin-bottom: ${36/16}rem;

  @media (min-width: ${768/16}) {
    margin-bottom: ${48/16}rem;
  }
`

FullscreenPostImage.displayName = 'FullscreenPostImage';

export const FullscreenPostText = styled.p`
	font-size: ${18/16}rem;
	line-height: 1.5em;
	color: ${(props) => props.theme.textSecondary};
  margin-bottom: ${36/16}rem;

  @media (min-width: ${768/16}) {
    margin-bottom: ${48/16}rem;
  }
`

FullscreenPostText.displayName = 'FullscreenPostText';

export const FullscreenPopularButtonWrapper = styled.div`
  display: flex;
	justify-content: space-between;
	gap: 0.5rem;
  margin-bottom: ${24/16}rem;

  @media (min-width: ${768/16}rem) {
    justify-content: start;
    flex: 1 0 auto;
  }
`

FullscreenPopularButtonWrapper.displayName = 'FullscreenPopularButtonWrapper';

export const FullscreenActionButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${56/16}rem;

  @media (min-width: ${768/16}rem) {
    flex-direction: row;
    margin-bottom: ${72/16}rem;
  }
`

FullscreenActionButtonWrapper.displayName = 'FullscreenActionButtonWrapper';