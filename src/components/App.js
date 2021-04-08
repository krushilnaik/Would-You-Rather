import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import './scss/App.scss';

import Home from './Home';
import SignInForm from './SignInForm';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import PageNotFound from './PageNotFound';
import MustSignIn from './MustSignIn';

import { logOut } from '../app/store';
// import Dashboard from './Dashboard';
import Question from './Question';

/**
 * markup for the main app
 * @param { {user: string, userDB: Map<string, import('../app/User').default>} } props
 */
function App(props) {
	const { user, userDB } = props;
	console.log(userDB instanceof Map);

	const handleClick = () => {
		logOut();
	};

	return (
		<div id='app'>
			<nav>
				<ul id='links'>
					<li className={window.location.pathname === '/' ? `current` : ''}>
						<Link to='/'>Home</Link>
					</li>
					<li className={window.location.pathname === '/new_question' ? `current` : ''}>
						<Link to='/new_question'>New Question</Link>
					</li>
					<li className={window.location.pathname === '/leader_board' ? `current` : ''}>
						<Link to='/leader_board'>Leader Board</Link>
					</li>
				</ul>

				{
					user && <div id='user-info'>
						<span>Hello, {user}</span>
						<img src={userDB.get(user).avatar} alt='user avatar' />
						<button onClick={handleClick}>Logout</button>
					</div>
				}
			</nav>

			<Switch>
				<Route exact path='/' render={() => (user ? <Home /> : <SignInForm />)} />
				{/* <Route exact path='/dashboard' render={() => (user ? <Dashboard /> : <MustSignIn />)} /> */}
				<Route exact path='/new_question' render={() => (user ? <NewQuestion /> : <MustSignIn />)} />
				<Route exact path='/leader_board' render={() => (user ? <LeaderBoard /> : <MustSignIn />)} />
				<Route path='/question/:id' children={user ? <Question /> : <MustSignIn />} />
				<Route path='*' render={() => <PageNotFound />} />
			</Switch>
		</div>
	);
}

/**
 * link Redux store with App's state
 * @param { {activeUser: string, userDB: Map<string, import('../app/User').default>} } state
 */
const mapStateToProps = state => ({ user: state.activeUser, userDB: state.userDB });

export default connect(mapStateToProps)(App);
