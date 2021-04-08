import React from 'react';
import { connect } from 'react-redux';
import './scss/LeaderBoard.scss';

// <i className="fas fa-trophy"></i>

/**
 * @param {{userDB: Map<String, import('../app/User').default>}} props 
 */
function LeaderBoard(props) {
	const { userDB } = props;
	const users = Array.from(userDB.values()).sort(
		(a, b) => {
			const scoreA = a.questionsAnswered.length + a.questionsAsked.length;
			const scoreB = b.questionsAnswered.length + b.questionsAsked.length;
			if (scoreA > scoreB) {
				return -1;
			} else if (scoreA > scoreB) {
				return 1;
			}

			return 0;
		}
	);

	const places = ['gold', 'green', 'black'];

	return (
		<div id='leader-board'>
			{
				users.slice(0, 3).map(
					(user, i) => (
						<div className="card">
							<div className='images'>
								<div className='cutout'></div>
								<i className={`fas fa-trophy ${places[i]}`} />
								{/* <i className="background fas fa-caret-up"></i> */}
								<img src={user.avatar} alt="user avatar" />
							</div>
							<div className='info'>
								<h4>{user.name}</h4>
								<div className="score-group">
									<span>Answered questions</span>
									<span>{user.questionsAnswered.length}</span>
								</div>
								<hr />
								<div className="score-group">
									<span>Created questions</span>
									<span>{user.questionsAsked.length}</span>
								</div>
							</div>
							<div className="score card">
								<div className="card-header">Score</div>
								<div className='number-badge'>
									<span>{user.questionsAnswered.length + user.questionsAsked.length}</span>
								</div>
							</div>
						</div>
					)
				)
			}
		</div>
	);
}

/**
 * @param {{userDB: Map<string, import('../app/User').default>}} state 
 */
const mapStateToProps = state => ({ userDB: state.userDB });

export default connect(mapStateToProps)(LeaderBoard);
