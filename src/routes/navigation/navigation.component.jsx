import { Outlet, Link} from 'react-router-dom'

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';

import {useContext} from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'



const Navigation = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    console.log(currentUser);


  return (
  <>
    <div className='navigation'>
        <Link className='nav-link' to='/'>
            <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {
                currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ): ( <Link className='nav-link' to='/auth'>
                SIGN IN
            </Link>)
                
            }
           <CartIcon/>
        </div>
     
{   isCartOpen && <CartDropdown/>}
    </div>
    <Outlet/>
  </>)
}
export default Navigation;