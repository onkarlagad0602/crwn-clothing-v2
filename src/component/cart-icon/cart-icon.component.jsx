import {ItemCount, CartIconContainer, ShoppingIcon} from './cart-icon.styles.jsx'
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen, cartCount}=useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;