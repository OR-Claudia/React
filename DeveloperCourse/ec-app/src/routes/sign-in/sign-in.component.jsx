import {
	signInWithGooglePopup,
	createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		//console.log("google gave us a response > ");
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<div>
			<h1>Sign-in Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
