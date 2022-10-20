import {StyledMainWrapper} from './style';
import {ReactNode} from 'react';

type MainWrapperProps = {
	children?: ReactNode,
}

export const MainWrapper = ({children}: MainWrapperProps) => {
	return <StyledMainWrapper>{children}</StyledMainWrapper>
}