import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};
const SignUpForm = () => {
	// As we know that all the fields are of same tag i.e. input so we can jointly use useState by creating object
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	console.log(formFields);
	const onChangeHandler = (event) => {
		// This name and value are getting us from the input tags the property that we have applied
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const onSubmitHandler = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords does not match');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password,
			);
			await createUserDocumentFromAuth(user, {
				displayName,
			});
			resetFormFields();
		} catch (error) {
			console.log('Error authenticating user', error);
		}
	};
	return (
		<div className='sign-up-container'>
			<form onSubmit={onSubmitHandler}>
				<h2>Don't have an account?</h2>
				<span>Sign up with your email and Password</span>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={onChangeHandler}
					name='displayName'
					value={displayName}
				/>

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

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={onChangeHandler}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
