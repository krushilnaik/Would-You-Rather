import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import User from './User';
import Question from './Question';

// Action Types
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const ADD_QUESTION = 'ADD_QUESTION';
const ANSWER_QUESTION = 'ANSWER_QUESTION';

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
 * @property {number} questionID
 * @property {string} asker
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
 */
const questionReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_QUESTION:
			const { optionOne, optionTwo, asker } = action.question;
			return state.concat([new Question(state.length, optionOne, optionTwo, asker)]);
		case ANSWER_QUESTION:
			const { questionID, answer } = action.answer;
			answer === 1 ? state[questionID].choseOne++ : state[questionID].choseTwo++;
			return state;
		default:
			return state;
	}
};

/**
 * @param {Map<string, User>} state key-value pairs of user's name to their object representation
 * @param {{type: string, question: QuestionModel, answer: AnswerModel}} action
 */
const userReducer = (state = new Map(), action) => {
	// let newState = new Map(state.entries());
	switch (action.type) {
		case ADD_QUESTION:
			state.forEach(
				user => {
					if (user.name === action.question.asker) {
						user.questionsAsked.push(action.question.questionID);
					}
				}
			);
			return state;
		case ANSWER_QUESTION:
			state.forEach(user => {
				if (user.name === action.answer.submitter) {
					const { questionID, answer } = action.answer;
					user.questionsAnswered.push({ questionID, answer });
				}
			});
			return state;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	activeUser: loginReducer,
	questions: questionReducer,
	userDB: userReducer
});

const persistConfig = { key: 'root', storage };

export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: [thunk],
	preloadedState: {
		userDB: new Map([
			[
				'Krushil Naik',
				new User(
					'Krushil Naik',
					'https://cdn2.iconfinder.com/data/icons/super-hero/154/ironman-head-comics-avatar-iron-man-512.png'
				)
			],
			[
				'Tyler McGinnis',
				new User(
					'Tyler McGinnis'
				)
			],
			[
				'Guest',
				new User(
					'Guest',
					'https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png'
				)
			]
		])
	}
});

export const { logIn, logOut, answerQuestion, addQuestion } = bindActionCreators(
	{
		logIn: activeUser => ({ type: LOG_IN, activeUser }),
		logOut: () => ({ type: LOG_OUT }),
		answerQuestion: (submitter, questionID, answer) => ({ type: ANSWER_QUESTION, answer: { submitter, questionID, answer } }),
		addQuestion: (optionOne, optionTwo, questionID, asker) => ({
			type: ADD_QUESTION,
			question: { optionOne, optionTwo, questionID, asker }
		})
	},
	store.dispatch
);
