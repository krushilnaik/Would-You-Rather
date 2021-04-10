import React, { useState } from 'react';

import './scss/SignInForm.scss';

import { logIn } from '../app/store';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

/**
 * @param {{userDB: import('../app/store').User[]}} props
 */
function SignInForm(props) {
	let [user, setUser] = useState('');
	let history = useHistory();
	const { userDB } = props;

	/**
	 * attempt to log in with the selected user
	 * @param {React.MouseEvent<HTMLButtonElement>} event
	 */
	const handleFormSubmit = event => {
		event.preventDefault();
		if (!user) {
			alert('Please select a user');
		} else {
			// log in as selected user
			logIn(user);
			history.push('/');
		}
	};

	/**
	 * makeshift select element's driver function
	 * @param {React.MouseEvent<HTMLButtonElement|HTMLDivElement>} event
	 */
	const handleSelect = event => {
		event.preventDefault();

		const target = event.currentTarget;

		if (target instanceof HTMLButtonElement) {
			target.innerText = user || userDB[0].name;
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
						style={{ color: user ? 'black' : '#999999' }}
					>
						{user || 'Select user:'}
					</button>
					<div className='dropdown-menu' aria-labelledby='user-select'>
						{Array.from(userDB.values()).map(user => (
							<div key={user.name} className='dropdown-item' onClick={handleSelect}>
								<img className='avatar' src={user.avatar} alt='user avatar' />
								<span className='username'>{user.name}</span>
							</div>
						))}
					</div>
				</div>

				<button onClick={handleFormSubmit} type='submit'>
					Sign in
				</button>
			</form>
		</div>
	);
}

/**
 * @param {{userDB: import('../app/store').User[]}} state
 */
const mapStateToProps = state => ({ userDB: state.userDB });

export default connect(mapStateToProps)(SignInForm);
