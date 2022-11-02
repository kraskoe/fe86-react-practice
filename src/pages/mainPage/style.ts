import styled from 'styled-components';

export const StyledMainArea = styled.div`
  padding-top: ${56/16}rem;
  padding-bottom: ${56/16}rem;

  @media (min-width: ${768/16}rem) {
    padding-top: ${72/16}rem;
    padding-bottom: ${72/16}rem;
  }
`

StyledMainArea.displayName = 'StyledMainArea';

export const PageTitle = styled.h1`
  color: ${(props) => props.theme.textSecondary};
  font-weight: 700;
  font-size: ${32/16}rem;
  line-height: 1.5em;
  margin-bottom: ${32/16}rem;

  @media (min-width: ${768/16}rem) {
    font-size: ${56/16}rem;
    line-height: 1.5em;
    margin-bottom: ${40/16}rem;
  }
`

PageTitle.displayName = 'PageTitle';