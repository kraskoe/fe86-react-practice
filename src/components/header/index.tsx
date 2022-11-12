import {HeaderWrapper} from './style';
import Burger from './burger';
import {Search} from './search';
import {UserCredentials} from './userCredentials';
import React from 'react';
import userIcon from '../../images/user-icon.svg';
import {useAppSelector} from '../../store/hooks';
import { TabletOrDesktop } from '../../utils/detectScreenSize';
import { HeaderButton } from './headerButton/style';
import {RequireAuth} from '../../containers/requireAuth';

export const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
   <HeaderWrapper>
     <Burger />
     <Search />
     <TabletOrDesktop>
       {user ?
         <RequireAuth>
           <UserCredentials />
         </RequireAuth> :
         <div>
           <HeaderButton aria-label="Log In Button"><img src={userIcon} alt='Default User Icon' /></HeaderButton>
         </div>
       }
     </TabletOrDesktop>
   </HeaderWrapper>
 )
}