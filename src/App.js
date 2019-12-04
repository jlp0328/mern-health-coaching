import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ClientMain from './components/ClientMain';
import ClientNav from './components/ClientNav';
import CheckIn from './components/CheckIn';
import Macros from './components/Macros';
import Measurements from './components/Measurements';
import Profile from './components/Profile';
import Weight from './components/Weight';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<ClientNav />
				<main className='main-page-container'>
					<Route exact path='/' component={ClientMain} />
					<Route path='/profile' component={Profile} />
					<Route path='/weight' component={Weight} />
					<Route path='/macros' component={Macros} />
					<Route path='/measurements' component={Measurements} />
					<Route path='/check-in' component={CheckIn} />
				</main>
			</Router>
		</div>
	);
}

export default App;
