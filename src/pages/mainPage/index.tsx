import React, { FC, PropsWithChildren} from 'react';
import { StyledMainArea } from './style';
import {TabsState} from '../../context/tabsState';

export const MainArea: FC<PropsWithChildren> = ({children}) => {

	return (
		<TabsState>
			<StyledMainArea>
				{children}
			</StyledMainArea>
		</TabsState>
	)
}