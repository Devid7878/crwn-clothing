import { createContext, useState, useEffect } from 'react';
import {
	createUserDocumentFromAuth,
	onAuthStateChangedListner,
} from '../utils/firebase/firebase.utils';
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const unsubscibe = onAuthStateChangedListner(async (user) => {
			if (user) {
				await createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscibe;
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
