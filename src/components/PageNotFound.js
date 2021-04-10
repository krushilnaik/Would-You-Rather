import React from 'react';

import './scss/PageNotFound.scss';

function PageNotFound() {
	return (
		<div id='not-found'>
			<div id='not-found-row'>
				<span>4</span>
				<i className='fas fa-times-circle'></i>
				<span>4</span>
			</div>
			<p>Page not found!</p>
		</div>
	);
}

export default PageNotFound;
