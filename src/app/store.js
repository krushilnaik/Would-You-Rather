import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import User from './User';
import Question from './Question';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const ADD_QUESTION = 'ADD_QUESTION';
const ANSWER_QUESTION = 'ANSWER_QUESTION';


export const userDB = {
	"Krushil Naik": new User('Krushil Naik', "https://cdn2.iconfinder.com/data/icons/super-hero/154/ironman-head-comics-avatar-iron-man-512.png"),
	"Tyler McGinnis": new User('Tyler McGinnis'),
	"Guest": new User('Guest')
};

/**
 * @param {string} state - user we're currently logged in as
 * @param {{type: string, activeUser: string}} action - action
 */
const loginReducer = (state = '', action) => {
	switch (action.type) {
		case LOG_IN:
			return action.activeUser;
		case LOG_OUT:
			return '';
		default:
			return state;
	}
};

/**
 * @typedef QuestionModel
 * @property {string} optionOne
 * @property {string} optionTwo
 */

/**
 * @typedef AnswerModel
 * @property {string} submitter
 * @property {number} questionID
 * @property {number} answer
 */

/**
 * @param {Question[]} state
 * @param {{ type: string, question: QuestionModel, answer: AnswerModel }} action
 * @returns 
 */
const questionReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_QUESTION:
			const { optionOne, optionTwo } = action.question;

			console.log(`Would you rather ${optionOne} or ${optionTwo}`);

			return state.concat( [new Question(state.length, optionOne, optionTwo)] );
		case ANSWER_QUESTION:
			const { submitter, questionID, answer } = action.answer;
			if (answer === 1) {
				state[questionID].answerOne();
				userDB.forEach(
					user => {
						if (user.name === submitter) {
							user.questionsAnswered.push( {questionID, answer} );
						}
					}
				)
			} else {
				state[questionID].answerTwo();
			}
			return state;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	activeUser: loginReducer,
	questions: questionReducer
});

const persistConfig = { key: 'root', storage };

export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: [thunk]
});

export const { logIn, logOut, answerQuestion, addQuestion } = bindActionCreators(
	{
		logIn: activeUser => ({ type: LOG_IN, activeUser }),
		logOut: () => ({ type: LOG_OUT }),
		answerQuestion: (questionID, answer) => ({type: ANSWER_QUESTION, answer: {questionID, answer}}),
		addQuestion: (optionOne, optionTwo) => ({type: ADD_QUESTION, question: {optionOne, optionTwo}})
	},
	store.dispatch
);
