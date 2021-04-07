import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './scss/App.scss';

import Home from './Home';
import SignInForm from './SignInForm';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import PageNotFound from './PageNotFound';
import MustSignIn from './MustSignIn';

import { logOut, userDB } from '../app/store';

/**
 * markup for the main app
 * @param { {user: string} } props
 */
function App(props) {
	const { user } = props;

	const handleClick = () => {
		logOut();
	};

	return (
		<div id='app'>
			<nav>
				<ul id='links'>
					<li className={window.location.pathname === '/' ? `current` : ''}>
						<a href='/'>Home</a>
					</li>
					<li className={window.location.pathname === '/new_question' ? `current` : ''}>
						<a href='/new_question'>New Question</a>
					</li>
					<li className={window.location.pathname === '/leader_board' ? `current` : ''}>
						<a href='/leader_board'>Leader Board</a>
					</li>
				</ul>

				{
					user && <div id='user-info'>
						<span>Hello, {user}</span>
						<img src={userDB[user].avatar} alt='user avatar' />
						<button onClick={handleClick}>Logout</button>
					</div>
				}
			</nav>

			<Switch>
				<Route exact path='/' render={() => (user ? <Home /> : <SignInForm />)} />
				<Route exact path='/new_question' render={() => (user ? <NewQuestion /> : <MustSignIn />)} />
				<Route exact path='/leader_board' render={() => (user ? <LeaderBoard /> : <MustSignIn />)} />
				<Route path='*' render={() => <PageNotFound />} />
			</Switch>
		</div>
	);
}

/**
 * link Redux store with App's state
 * @param { {activeUser: string} } state
 */
const mapStateToProps = state => ({ user: state.activeUser });

export default connect(mapStateToProps)(App);
