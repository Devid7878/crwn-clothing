import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const {
		removeItemFromCheckoutPermanently,
		addItemToCart,
		removeItemFromCart,
	} = useContext(CartContext);

	const onRemoveCheckoutItemHandler = () =>
		removeItemFromCheckoutPermanently(cartItem);
	const onIncrementItemInCheckout = () => addItemToCart(cartItem);
	const onDecrementItemInCheckout = () => removeItemFromCart(cartItem);

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={onDecrementItemInCheckout}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={onIncrementItemInCheckout}>
					&#10095;
				</div>
			</span>
			<span className='price'>{price}</span>
			<span className='remove-button' onClick={onRemoveCheckoutItemHandler}>
				&#10005;
			</span>
		</div>
	);
};

export default CheckoutItem;
