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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0,
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
