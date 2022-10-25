import {StyledAppWrapper} from './style';
import {FC, PropsWithChildren} from 'react';

export const AppWrapper: FC<PropsWithChildren> = ({children}) => {
	return <StyledAppWrapper>{children}</StyledAppWrapper>
}