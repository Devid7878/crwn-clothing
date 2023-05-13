import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyChg5d0obD9S7lVo8ngExQb5xcdjIfBOMU',
	authDomain: 'crwn-clothing-db-1d873.firebaseapp.com',
	projectId: 'crwn-clothing-db-1d873',
	storageBucket: 'crwn-clothing-db-1d873.appspot.com',
	messagingSenderId: '747970006251',
	appId: '1:747970006251:web:e96e69e4b5fea4ed2782ae',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = async () =>
	await signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = await doc(db, 'users', userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);
	console.log(userSnapShot.exists());

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userDocRef;
};
