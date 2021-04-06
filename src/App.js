import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.scss';

import Home from './components/Home';
import SignInForm from './components/SignInForm';
import LeaderBoard from './components/LeaderBoard';
import NewQuestion from './components/NewQuestion';

import { logOut } from './app/store';

/**
 * markup for the main app
 * @param { {user: string} } props 
 */
function App(props) {
	const { user } = props;

	const handleClick = () => {
		logOut();
	}

	return (
		<div id='app'>
			<nav>
				<ul id='links'>
					<li className='current'>
						<a href='/home'>Home</a>
					</li>
					<li>
						<a href='/new_question'>New Question</a>
					</li>
					<li>
						<a href='/leader_board'>Leader Board</a>
					</li>
				</ul>

				{
					user && <div id='user-info'>
						<span>Hello, {user}</span>
						<img src="assets/images/react-redux.jpeg" alt="user avatar" />
						<button onClick={handleClick}>Logout</button>
					</div>
				}
			</nav>

			<Route exact path='/' render={() => user ? <Home /> : <SignInForm />} />
			<Route exact path='/new_question' render={() => <NewQuestion />} />
			<Route exact path='/leader_board' render={() => <LeaderBoard />} />
		</div>
	);
}

/**
 * link Redux store with App's state
 * @param { {user: string} } state 
 */
const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps)(App);
