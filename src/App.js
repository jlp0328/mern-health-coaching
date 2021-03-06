import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';

import ClientMain from './components/ClientMain/ClientMain';
import ClientNav from './components/ClientNav/ClientNav';
import CheckIn from './components/CheckIn/CheckIn';
import Measurements from './components/Measurements/Measurements';
import Profile from './components/ClientProfile/Profile';

//Used for Weight, Macros, Exercise Logs
import ExerciseLogPage from './components/ExerciseLog/ExerciseLogPage';
import WeightLogPage from './components/WeightLog/WeightLogPage';
import MacrosLogPage from './components/MacrosLog/MacrosLogPage';

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

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			personal: {},
			goals: {},
		};
	}
	async componentDidMount() {
		try {
			const clientInfo = await axios.get(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/clients/5dee532f975664ad3bd47094`,
			);

			const clientGoals = await axios.get(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/clients/goals/${clientInfo.data._id}`,
			);

			this.setState({
				personal: clientInfo.data,
				goals: clientGoals.data,
			});

			console.log(this.state);
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<ClientNav />
					<main className='main-page-container'>
						<Route
							exact
							path='/'
							render={props => <ClientMain client={this.state} />}
						/>
						<Route
							path='/profile'
							render={props => <Profile client={this.state.personal} />}
						/>
						<Route
							path='/weight'
							render={props => (
								<WeightLogPage client={this.state.personal} type='weight' />
							)}
						/>
						<Route
							path='/macros'
							render={props => (
								<MacrosLogPage
									client={this.state.personal}
									goals={this.state.goals}
									type='macros'
								/>
							)}
						/>
						<Route
							path='/exercise'
							render={props => (
								<ExerciseLogPage client={this.state.personal} type='exercise' />
							)}
						/>
						<Route path='/measurements' component={Measurements} />
						<Route
							path='/check-in'
							render={props => <CheckIn client={this.state.personal} />}
						/>
					</main>
				</Router>
			</div>
		);
	}
}

export default App;
