import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import './scss/Question.scss';

import { store, answerQuestion } from '../app/store';

/**
 * @param { {user: string, userDB: Map<string, import('../app/User').default>} } props
 */
function Question(props) {
	// @ts-ignore
	const { id } = useParams();
	const { userDB } = props;
	const question = store.getState().questions[id];
	const [selection, setSelection] = useState(0);
	const [view, setView] = useState(
		userDB.get(props.user).questionsAnswered.map(q => q.questionID).includes(Number(id))
			? 'answered'
			: 'unanswered'
	);

	/**
	 * @param {React.MouseEvent<HTMLButtonElement>} event
	 */
	const handleSubmit = event => {
		event.preventDefault();

		answerQuestion(props.user, Number(id), selection);
		setView('answered');
	};

	const askView = () => (
		<React.Fragment>
			<div className="card-header">{`${question.submitter} asks:`}</div>
			<div className='card-content'>
				<img src={userDB.get(props.user).avatar} alt="user avatar" />
				<div className="would-you-rather asking">
					<h5>Would You Rather ...</h5>
					<div>
						<input defaultChecked={selection === 1} onClick={() => {setSelection(1);}} type="radio" id='option-one' value={question.optionOne}/>
						<label htmlFor="option-one">{question.optionOne}</label>
					</div>
					<div>
						<input defaultChecked={selection === 2} onClick={() => {setSelection(2);}} type="radio" id='option-two' value={question.optionTwo}/>
						<label htmlFor="option-two">{question.optionTwo}</label>
					</div>
					<button onClick={handleSubmit} className='btn btn-success'>Submit</button>
				</div>
			</div>
		</React.Fragment>
	);

	const answerView = () => {
		const userChoice = userDB.get(props.user).questionsAnswered.filter(
			question => question.questionID === Number(id)
		)[0].answer;

		const { choseOne, choseTwo } = question;

		return <React.Fragment>
			<div className="card-header">{`Asked by ${question.submitter}`}</div>
			<div className='card-content'>
				<img src={userDB.get(props.user).avatar} alt="user avatar" />
				<div className="would-you-rather answered">
					<h5>Results:</h5>
					<div className={`card ${userChoice === 1 ? 'chosen' : ''}`}>
						<p>Would you rather {question.optionOne}?</p>

						<div className="bar">
							{choseOne > 0 && <div className="percentage" style={{ width: `${choseOne / (choseOne + choseTwo) * 100}%` }}>{`${choseOne / (choseOne + choseTwo) * 100}%`}</div>}
						</div>

						<p>{`${choseOne} out of ${choseOne + choseTwo} votes`}</p>
					</div>
					<div className={`card ${userChoice === 2 ? 'chosen' : ''}`}>
						<p>Would you rather {question.optionTwo}?</p>

						<div className="bar">
							{choseTwo > 0 && <div className="percentage" style={{ width: `${choseTwo / (choseOne + choseTwo) * 100}%` }}>{`${choseTwo / (choseOne + choseTwo) * 100}%`}</div>}
						</div>

						<p>{`${choseTwo} out of ${choseOne + choseTwo} votes`}</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	};

	return (
		<div className="question card">
			{ view === 'answered' ? answerView() : askView() }
		</div>
	);
}

/**
 * @param { {
 * 	activeUser: string,
 * 	userDB: Map<string, import('../app/User').default>
 * } } state
 */
const mapStateToProps = state => ({ user: state.activeUser, userDB: state.userDB });

export default connect(mapStateToProps)(Question);
