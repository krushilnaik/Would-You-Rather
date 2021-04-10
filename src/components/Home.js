import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import './scss/Home.scss';

/**
 * @param { {
 * 	questions: import('../app/store').Question[],
 * 	user: import('../app/store').User,
 * 	userDB: import('../app/store').User[]
 * } } props
 */
function Home(props) {
	const { questions, user, userDB } = props;
	let history = useHistory();

	const answeredQuestions = questions.filter(question =>
		user.questionsAnswered.map(answers => answers.questionID).includes(question.id)
	);

	const unansweredQuestions = questions.filter(
		question => !answeredQuestions.map(answers => answers.id).includes(question.id)
	);

	/**
	 * @param {React.MouseEvent<HTMLButtonElement>} event
	 * @param {number} questionID
	 */
	const handleClick = (event, questionID) => {
		event.preventDefault();
		history.push(`/questions/${questionID}`);
	};

	/**
	 * generate markup for questions in an array
	 * @param {import('../app/store').Question[]} qArray
	 * @returns array of divs representing an overview of each question
	 */
	const displayQuestions = qArray =>
		qArray.map(question => (
			<div key={question.id} className='question card bg-light'>
				<div className='card-header'>{`${question.submitter} asks:`}</div>

				<div className='card-content'>
					<img src={userDB.find(u => u.name === question.submitter).avatar} alt='user avatar' />

					<div className='would-you-rather'>
						<h5>Would you rather</h5>
						<p>...{question.optionOne}...</p>
						<button
							onClick={event => {
								handleClick(event, question.id);
							}}
							className='btn btn-outline-success'
						>
							View Poll
						</button>
					</div>
				</div>
			</div>
		));

	return (
		<div className='dashboard card'>
			<ul className='nav nav-tabs' id='question-tabs' role='tablist'>
				<li className='nav-item' role='presentation'>
					<button
						className='nav-link active'
						id='unanswered-tab'
						data-bs-toggle='tab'
						data-bs-target='#unanswered'
						type='button'
						role='tab'
						aria-controls='unanswered'
						aria-selected='true'
					>
						Unanswered Questions
					</button>
				</li>
				<li className='nav-item' role='presentation'>
					<button
						className='nav-link'
						id='answered-tab'
						data-bs-toggle='tab'
						data-bs-target='#answered'
						type='button'
						role='tab'
						aria-controls='answered'
						aria-selected='true'
					>
						Answered Questions
					</button>
				</li>
			</ul>
			<div className='tab-content' id='questions'>
				<div
					className='tab-pane fade show active'
					id='unanswered'
					role='tabpanel'
					aria-labelledby='unanswered-tab'
				>
					{displayQuestions(unansweredQuestions)}
				</div>
				<div className='tab-pane fade' id='answered' role='tabpanel' aria-labelledby='answered-tab'>
					{displayQuestions(answeredQuestions)}
				</div>
			</div>
		</div>
	);
}

/**
 * @param {{
 * 	questions: import('../app/store').Question[],
 * 	activeUser: string,
 * 	userDB: import('../app/store').User[]
 * }} state
 */
const mapStateToProps = state => ({
	user: state.userDB.find(u => u.name === state.activeUser),
	questions: state.questions,
	userDB: state.userDB
});

export default connect(mapStateToProps)(Home);
