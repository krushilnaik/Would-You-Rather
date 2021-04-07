import React from 'react';
import { connect } from 'react-redux';
import Question from '../app/Question';
import './scss/Dashboard.scss';

/**
 * @param { {questions: Question[], user: string} } props
 */
function Dashboard(props) {
	const { questions, user } = props;

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
					Unanswered Questions go here
				</div>
				<div className='tab-pane fade' id='answered' role='tabpanel' aria-labelledby='answered-tab'>
					Answered Questions go here
				</div>
			</div>
		</div>
	);
}

/**
 * @param {{questions: Question[], activeUser: string}} state
 */
const mapStatetoProps = state => ({ user: state.activeUser, questions: state.questions });

export default connect(mapStatetoProps)(Dashboard);
