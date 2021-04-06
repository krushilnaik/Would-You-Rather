import React, { useState } from 'react';

import './scss/SignInForm.scss';

import { logIn } from '../app/store';

function SignInForm() {
	let [user, setUser] = useState('');

	/**
	 * attempt to log in with the selected user
	 * @param {React.MouseEvent<HTMLButtonElement>} event 
	 */
	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!user) {
			alert('Please select a user');
		} else {
			// log in as selected user
			logIn(user);
		}
	};

	/**
	 * makeshift select element's driver function
	 * @param {React.MouseEvent<HTMLButtonElement|HTMLDivElement>} event 
	 */
	const handleSelect = (event) => {
		event.preventDefault();

		const target = event.currentTarget;

		if (target instanceof HTMLButtonElement) {
			target.innerText = user || 'Krushil Naik';
		} else {
			const newUser = target.querySelector('span').innerText;
			setUser(newUser);
		}
	};

	return (
		<div className='sign-in card'>
			<div className='card-header bg-light'>
				<h1>Welcome to the Would You Rather App!</h1>
				<h2>Please sign in to continue</h2>
			</div>

			<form>
				<img src='assets/images/react-redux.jpeg' alt='react redux logo' />
				<p>Sign in</p>

				<div className='dropdown'>
					<button
						className='btn dropdown-toggle'
						type='button'
						id='user-select'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
						onClick={handleSelect}
						style={ {color: user ? 'black' : '#999999'} }
					>
						{user || 'Select user:'}
					</button>
					<div className='dropdown-menu' aria-labelledby='user-select'>
						<div className='dropdown-item' onClick={handleSelect}>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Krushil Naik</span>
						</div>
						<div className='dropdown-item' onClick={handleSelect}>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Tyler McGinnis</span>
						</div>
						<div className='dropdown-item' onClick={handleSelect}>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Guest</span>
						</div>
					</div>
				</div>

				<button onClick={handleFormSubmit} type='submit'>
					Sign in
				</button>
			</form>
		</div>
	);
}

export default SignInForm;
