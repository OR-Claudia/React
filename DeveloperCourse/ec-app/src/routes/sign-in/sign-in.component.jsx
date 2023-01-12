import {
	signInWithGooglePopup,
	createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		//console.log("google gave us a response > ");
		const userDocRef = await createUserDocFromAuth(response);
	};

	return (
		<div>
			<h1>Sign-in Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;
