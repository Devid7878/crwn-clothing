import { useState } from 'react';
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
	email: '',
	password: '',
};
const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	console.log(formFields);
	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const onSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password,
			);
			console.log(response);
			resetFormFields();
		} catch (error) {
			alert(error);
		}
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	return (
		<div className='sign-in-container'>
			<form onSubmit={onSubmitHandler}>
				<h2>Already have an account?</h2>
				<span>Sign in with your email and Password</span>

				<FormInput
					label='Email'
					type='email'
					required
					onChange={onChangeHandler}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={onChangeHandler}
					name='password'
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
