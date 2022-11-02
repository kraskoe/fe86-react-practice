import React, { FC, PropsWithChildren} from 'react';
import { StyledMainArea } from './style';

export const MainArea: FC<PropsWithChildren> = ({children}) => {

	return (
		<StyledMainArea>
			{children}
		</StyledMainArea>
	)
}