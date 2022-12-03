import React from 'react';
import {HeaderWrapper} from './style';
import Burger from './burger';
import {Search} from './search';
import {UserCredentials} from './userCredentials';
import userIcon from '../../images/user-icon.svg';
import {useAppSelector} from '../../store/hooks/hooks';
import { TabletOrDesktop } from '../../utils/detectScreenSize';
import { HeaderButton } from './headerButton/style';
import {RequireAuth} from '../../containers/requireAuth';
import {FromLink} from '../shared/fromLink';

export const Header = () => {
  const user = useAppSelector((state) => state.auth.profileData.user);

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
           <FromLink to={'/login'}>
             <HeaderButton aria-label="Log In Button"><img src={userIcon} alt='Default User Icon' /></HeaderButton>
           </FromLink>
         </div>
       }
     </TabletOrDesktop>
   </HeaderWrapper>
 )
}