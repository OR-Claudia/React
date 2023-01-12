import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA_PKi4LZGN9VRfAeAYbSjx0rREh2XFNRU",
	authDomain: "crown-25959.firebaseapp.com",
	projectId: "crown-25959",
	storageBucket: "crown-25959.appspot.com",
	messagingSenderId: "1076954280196",
	appId: "1:1076954280196:web:9e80df561cbd554cf02051",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //a class used in order to have one or multiple providers

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth(); //rules for authentication
export const signInWithGooglePopup = async () =>
	signInWithPopup(auth, provider); //gets the auth and the provider (google)

export const db = getFirestore(); // singleton instance to our firestore db

export const createUserDocFromAuth = async (userAuth) => {
	console.log(userAuth);
	const userDocRef = doc(db, "users", userAuth.user.uid); //uid is a unique id identifier provided by google
	const userSnapshot = await getDoc(userDocRef);
	//console.log(userSnapshot.exists()); //this points to the same identifier as userDocRef but this checks if the document exists

	if (!userSnapshot.exists()) {
		//we create and set the user with setDoc, if the user doesn't exist.
		const { displayName, email } = userAuth.user;
		const createdAt = new Date();
		try {
			setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating the user: ", error.message);
		}
	}

	return userDocRef;
};
