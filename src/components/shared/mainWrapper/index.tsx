import { StyledMainWrapper } from './style'
import {FC, PropsWithChildren} from 'react';

export const MainWrapper: FC<PropsWithChildren> = ({children}) => {

	return (
		<StyledMainWrapper>
			{children}
		</StyledMainWrapper>
	)
}