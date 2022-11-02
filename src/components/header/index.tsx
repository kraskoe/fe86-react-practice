import {HeaderWrapper} from './style';
import Burger from './burger';
import {Search} from './search';
import {UserCredentials} from './userPanel';
import React from 'react';
import userIcon from '../../images/user-icon.svg';
import {HeaderButton} from './headerButton';
import {useAppSelector} from '../../store/hooks';
import { TabletOrDesktop } from '../../utils/detectScreenSize';

export const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
   <HeaderWrapper>
     <Burger />
     <Search />
     <TabletOrDesktop>
       {user ?
         <UserCredentials /> :
         <HeaderButton aria-label="Log In Button"><img src={userIcon} alt='Default User Icon' /></HeaderButton>
       }
     </TabletOrDesktop>
   </HeaderWrapper>
 )
}