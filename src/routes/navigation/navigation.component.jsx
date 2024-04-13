import { Outlet, Link} from 'react-router-dom'

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';

import {useContext} from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles.jsx'



const Navigation = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    console.log(currentUser);


  return (
  <>
        <NavigationContainer>
       <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
        </LogoContainer>
            <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
                currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ): ( <NavLink className='nav-link' to='/auth'>
                SIGN IN
            </NavLink>)
                
            }
           <CartIcon/>
</NavLinks>     
{   isCartOpen && <CartDropdown/>}
</NavigationContainer>

    <Outlet/>
  </>)
}
export default Navigation;