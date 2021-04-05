import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SignInForm from './components/SignInForm';
import LeaderBoard from './components/LeaderBoard';
import NewQuestion from './components/NewQuestion';

function App() {
	return (
		<div id="app">
			<nav>
				<ul id="links">
					<li className='current'>
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/new_question">New Question</a>
					</li>
					<li>
						<a href="/leader_board">Leader Board</a>
					</li>
				</ul>

				<div id="user-info"></div>
			</nav>

			<Route exact path='/' render={() => <SignInForm />} />
			<Route exact path='/home' render={() => <Home />} />
			<Route exact path='/new_question' render={() => <NewQuestion />} />
			<Route exact path='/leader_board' render={() => <LeaderBoard />} />
		</div>
	);
}

export default App;
