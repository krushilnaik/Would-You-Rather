import React, { useState } from 'react';

import './scss/SignInForm.scss';

function SignInForm() {
	let [user, setUser] = useState('');

	const handleClick = () => {
		if (!user) {
			alert('Please select a user');
		} else {
			// log in as selected user
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
					>
						Select user:
					</button>
					<div className='dropdown-menu' aria-labelledby='user-select'>
						<div className='dropdown-item'>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Krushil Naik</span>
						</div>
						<div className='dropdown-item'>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Tyler McGinnis</span>
						</div>
						<div className='dropdown-item'>
							<img className='avatar' src='assets/images/react-redux.jpeg' alt='user avatar' />
							<span className='username'>Guest</span>
						</div>
					</div>
				</div>

				<button onClick={handleClick} type='submit'>
					Sign in
				</button>
			</form>
		</div>
	);
}

export default SignInForm;
