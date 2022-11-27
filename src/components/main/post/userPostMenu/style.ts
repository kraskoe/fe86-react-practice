import styled from 'styled-components';

export const UserPostMenuWrapper = styled.div`
	display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
	bottom: 100%;
	left: 0;
	
	&.active {
		display: flex;
	}
`
UserPostMenuWrapper.displayName = 'UserPostMenuWrapper';

export const UserPostActions = styled.div`
	position: relative;
`
UserPostActions.displayName = 'UserPostActions';
