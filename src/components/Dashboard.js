import React from 'react';
import { connect } from 'react-redux';
import Question from '../app/Question';
import User from '../app/User';
import { userDB } from '../app/store';
import './scss/Dashboard.scss';

/**
 * @param { {questions: Question[], user: User} } props
 */
function Dashboard(props) {
	const { questions, user } = props;

	console.log(`Listing questions from the POV of ${user.name}`);
	console.log(questions);

	const answeredQuestions = questions.filter(
		question => user.questionsAnswered.map(
			answers => answers.questionID
		).includes(question.id)
	);

	const unansweredQuestions = questions.filter(
		question => !answeredQuestions.map(
			answers => answers.id
		).includes(question.id)
	);

	console.log(`User has answered these questions ${JSON.stringify(answeredQuestions)}`);
	console.log(`User hasn't answered these questions ${JSON.stringify(unansweredQuestions)}`);

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
				<div className='tab-pane show active' id='unanswered' role='tabpanel' aria-labelledby='unanswered-tab'>
					{
						unansweredQuestions.map(
							question => (
								<div key={question.id} className="question card bg-light">
									<div className="card-header">{`${question.submitter} asks:`}</div>
									
									<div className='card-content'>
										<img src={userDB.get(question.submitter).avatar} alt="user avatar" />

										<div className="would-you-rather">
											<h5>Would you rather</h5>
											<p>...{question.optionOne}</p>
											<button className='btn btn-outline-success'>View Poll</button>
										</div>
									</div>
								</div>
							)
						)
					}
				</div>
				<div className='tab-pane' id='answered' role='tabpanel' aria-labelledby='answered-tab'>
					Answered Questions go here
				</div>
			</div>
		</div>
	);
}

/**
 * @param {{questions: Question[], activeUser: string}} state
 */
const mapStatetoProps = state => ({ user: userDB.get(state.activeUser), questions: state.questions });

export default connect(mapStatetoProps)(Dashboard);
