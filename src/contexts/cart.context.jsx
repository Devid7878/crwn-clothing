import { createContext, useEffect, useState } from 'react';

// Helper fxn
const addCartItem = (cartItems, productToAdd) => {
	// Match the id of cart items already in the cart with the new product we are going to add
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id,
	);

	// If there is some existing items in the cart then Modify the cart items
	if (existingCartItems) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem,
		);
	}

	// If there are no existing items then simply return the added item to cart
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	// Match the id of cart items already in the cart with the new product we are going to add
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id,
	);

	// If there is some existing items in the cart then see if the item is 1 quantity and then if we try to decrement then just remove that item from cart
	if (existingCartItems.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem,
	);
};

const removeFromCheckoutPermanently = (cartItems, cartItemToRemove) => {
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id,
	);

	if (existingCartItems) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	removeItemFromCheckoutPermanently: () => {},
	cartCount: 0,
	checkoutTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [checkoutTotal, setCheckoutTotal] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	const removeItemFromCheckoutPermanently = (cartItemToRemove) => {
		setCartItems(removeFromCheckoutPermanently(cartItems, cartItemToRemove));
	};

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0,
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCheckoutTotal = cartItems.reduce(
			(checkoutTotal, cartItem) =>
				checkoutTotal + cartItem.quantity * cartItem.price,
			0,
		);
		setCheckoutTotal(newCheckoutTotal);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		removeItemFromCheckoutPermanently,
		cartItems,
		cartCount,
		checkoutTotal,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
