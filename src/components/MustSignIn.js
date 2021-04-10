import React from 'react';

import './scss/MustSignIn.scss';

/**
 * @param {{message: string}} props
 */
function MustSignIn(props) {
	return (
		<div id='blocker'>
			<img
				src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/52374/person-gesturing-no-emoji-clipart-md.png'
				alt='man gesturing no'
			/>
			<p>You gotta sign in to {props.message}!</p>
		</div>
	);
}

export default MustSignIn;
