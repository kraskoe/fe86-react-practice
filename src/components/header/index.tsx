import {HeaderWrapper} from './style';
import BurgerState from '../../context/burgerState';
import Burger from '../burger';
import {Search} from '../search';
import {UserCredentials} from '../username';
import React, {useContext} from 'react';
import userIcon from '../../images/user-icon.svg';
import {HeaderButton} from '../button';
import {AuthContext} from '../../context/authState';
import { isBrowser, isTablet } from 'react-device-detect';

export const Header = () => {
  const { user } = useContext(AuthContext);

  return (
   <HeaderWrapper>
     <BurgerState>
       <Burger />
     </BurgerState>
     <Search />
     {(isBrowser || isTablet) && (user ?
       <UserCredentials /> :
       <HeaderButton aria-label="Log In Button"><img src={userIcon} alt='Default User Icon' /></HeaderButton>)
     }
   </HeaderWrapper>
 )
}