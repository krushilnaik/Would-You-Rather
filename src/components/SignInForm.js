import React, { useState } from 'react';

import './css/SignInForm.css';

function SignInForm() {
	let [user, setUser] = useState('');

	/**
	 * @param {React.ChangeEvent<HTMLSelectElement>} event 
	 */
	const changeSelectedUser = (event) => {
		setUser(event.target.options[event.target.selectedIndex].value);
	}

	const handleClick = () => {
		if (!user) {
			alert('Please select a user');
		} else {
			// log in as selected user
		}
	}

	return (
		<div className="sign-in">
			<div className="header">
				<h1>Welcome to the Would You Rather App!</h1>
				<h2>Please sign in to continue</h2>
			</div>

			<form>
				<img src="assets/images/react-redux.jpeg" alt="react redux logo" />
				<label htmlFor="user">Sign in</label>
				<select defaultValue={user} name="select-user" id="user" onChange={changeSelectedUser}>
					<option value="" disabled>Select User</option>
					<option value="krushil_naik">Krushil Naik</option>
					<option value="tyler_mcginnis">Tyler McGinnis</option>
					<option value="krushil_naik">Krushil Naik</option>
				</select>

				<button onClick={handleClick} type="submit">Sign in</button>
			</form>
		</div>
	);
}

export default SignInForm;
