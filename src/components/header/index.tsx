import {HeaderWrapper} from './style';
import BurgerState from '../../context/burgerstate';
import Burger from '../burger';
import {Search} from '../search';
import {User} from '../username';
import React from 'react';
import userIcon from '../../images/user-icon.svg';
import {HeaderButton} from '../button';


export const Header = () => {




 return (
   <HeaderWrapper>
    <BurgerState>
    <Burger />
    </BurgerState>
    <Search />
    <HeaderButton aria-label="Log In Button"><img src={userIcon} alt='Default User Icon' /></HeaderButton>
    <User user='Artem Malkin'/>
   </HeaderWrapper>
 )
}