import { useContext } from 'react';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';

export const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartItems, cartCount } =
		useContext(CartContext);
	const onTogglehandler = () => setIsCartOpen(!isCartOpen);

	return (
		<div className='cart-icon-container' onClick={onTogglehandler}>
			<ShoppingCartIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};
