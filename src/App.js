import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import ClientMain from './components/ClientMain';
import ClientNav from './components/ClientNav';
import CheckIn from './components/CheckIn';
import Macros from './components/Macros';
import Measurements from './components/Measurements';
import Profile from './components/Profile';
import Weight from './components/Weight';

import './App.css';

const drawerWidth = 240;

//Will need to come back and add Redux to manage state when drawer is open to shift main's contents
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

function App() {
	const classes = useStyles();
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
