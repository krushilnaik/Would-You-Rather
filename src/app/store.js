import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

/**
 * @param {string} state - user we're currently logged in as
 * @param {{type: string, user: string}} action - action
 */
const userReducer = (state = '', action) => {
	switch (action.type) {
		case LOG_IN:
			return action.user;
		case LOG_OUT:
			return '';
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: userReducer
});

const persistConfig = { key: 'root', storage };

export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: [thunk]
});

export const { logInAs, logOut } = bindActionCreators(
	{
		logInAs: user => ({type: LOG_IN, user}),
		logOut: () => ({type: LOG_OUT})
	},
	store.dispatch
);
