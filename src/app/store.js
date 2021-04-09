import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

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
 * @typedef User
 * @property {string} name
 * @property {string} avatar
 * @property { {questionID: number, answer: number}[] } questionsAnswered
 * @property {number[]} questionsAsked
 */

/**
 * @typedef Question
 * @property {number} id
 * @property {string} optionOne
 * @property {string} optionTwo
 * @property {string} submitter
 * @property {number} choseOne
 * @property {number} choseTwo
 */

/**
 * @type {User[]}
 */
let userDB = [
	{
		name: 'Krushil Naik',
		avatar: 'https://cdn2.iconfinder.com/data/icons/super-hero/154/ironman-head-comics-avatar-iron-man-512.png',
		questionsAnswered: [],
		questionsAsked: []
	},
	{
		name: 'Tyler McGinnis',
			avatar: 'assets/images/react-redux.jpeg',
			questionsAnswered: [],
			questionsAsked: []
	},
	{
		name: 'Waldo',
		avatar: 'https://i.pinimg.com/236x/ea/d6/be/ead6bef635795a9dc0a511e815c778c3--wheres-wally-kid-books.jpg',
		questionsAnswered: [],
		questionsAsked: []
	}
];

/**
 * @param {Question[]} state
 * @param {{ type: string, question: QuestionModel, answer: AnswerModel }} action
 */
const questionReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_QUESTION:
			const { optionOne, optionTwo, asker } = action.question;
			return state.concat([{id: state.length, optionOne, optionTwo, submitter: asker, choseOne: 0, choseTwo: 0}]);
		case ANSWER_QUESTION:
			const { questionID, answer } = action.answer;
			let newState = Array.from(state);
			answer === 1 ? newState[questionID].choseOne++ : newState[questionID].choseTwo++;
			return newState;
		default:
			return state;
	}
};

/**
 * @param {User[]} state key-value pairs of user's name to their object representation
 * @param {{type: string, question: QuestionModel, answer: AnswerModel}} action
 */
const userReducer = (state = userDB, action) => {
	let newState = Array.from(state);
	switch (action.type) {
		case ADD_QUESTION:
			newState.forEach(
				user => {
					if (user.name === action.question.asker) {
						user.questionsAsked.push(action.question.questionID);
					}
				}
			);
			return newState;
		case ANSWER_QUESTION:
			newState.forEach(user => {
				if (user.name === action.answer.submitter) {
					const { questionID, answer } = action.answer;
					user.questionsAnswered.push({ questionID, answer });
				}
			});
			return newState;
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
		userDB
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
