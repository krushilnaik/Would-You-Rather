import { bindActionCreators, configureStore } from '@reduxjs/toolkit';

/**
 * @param {string} state - user we're currently logged in as
 * @param {{type: string, user: string}} action - action
 */
const userReducer = (state = '', action) => {
	switch (action.type) {
		case 'LOG_IN':
			return action.user;
		case 'LOG_OUT':
			return '';
		default:
			return state;
	}
};

export const store = configureStore({
	reducer: {
		user: userReducer
	},
	preloadedState: {
		user: ''
	}
});

export const { logInAs, logOut } = bindActionCreators(
	{
		logInAs: user => ({type: 'LOG_IN', user}),
		logOut: () => ({type: 'LOG_OUT'})
	},
	store.dispatch
);
