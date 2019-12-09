import React, { Component } from 'react';
import axios from 'axios';

import MacrosInput from './DailyInputsFields';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const dateFormat = require('dateformat');
const DATE_NOW = new Date();

const inputData = require('./daily-inputs.json');

export default class ClientMainDailyInputs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			client: this.props.client,
			weight: '',
			carbs: '',
			protein: '',
			fat: '',
			fiber: '',
			exercise: '',
			notes: '',
			needWeight: true,
			needMacros: true,
		};
	}

	async componentDidUpdate() {
		const todaysWeight = await axios.get(
			`http://10.119.170.10:5000/weight/${this.props.client._id}`,
		);

		const today = dateFormat(DATE_NOW, 'fullDate');
		const latestWeight = dateFormat(todaysWeight.data[0].date, 'fullDate');

		this.setState({
			needWeight: today === latestWeight ? false : true,
		});
	}

	updateWeight = e => {
		this.setState({
			weight: e.target.value,
		});
	};

	updateMacrosExercise = e => {
		let update = {};
		update[e.target.name] = e.target.value;
		this.setState(update);
	};

	isNumberKey = e => {
		if ((e.which >= 48 && e.which <= 57) || e.which === 8 || e.which === 46) {
			return;
		} else {
			e.preventDefault();
		}
	};

	submitWeight = async e => {
		e.preventDefault();
		const todaysWeight = {
			user: this.props.client._id,
			weight: this.state.weight,
		};

		await axios.post(
			`http://10.119.170.10:5000/weight/daily-log`,
			todaysWeight,
		);
	};

	submitMacros = async e => {
		e.preventDefault();

		// const todaysMacrosExercise = {
		//   user:
		// }
	};

	createInputList = () => {
		return inputData.map((elem, index) => {
			return (
				<MacrosInput
					key={index}
					label={elem.label}
					name={elem.name}
					type={elem.label}
					required={elem.required}
					onChange={this.updateMacrosExercise}
					onKeyPress={this.isNumberKey}
				/>
			);
		});
	};

	render() {
		return (
			<Card>
				<CardContent>
					<h3>Update Today's Numbers</h3>
					<div className='client-landing-daily-inputs'>
						{!this.state.needWeight ? (
							<h3>Thank you for submitting your weight today!</h3>
						) : (
							<form className='client-landing-daily-inputs--left'>
								<h4>Weight</h4>
								<TextField
									label='Weight'
									type='text'
									margin='normal'
									onChange={this.updateWeight}
									onKeyPress={this.isNumberKey}
									inputProps={{
										minLength: 2,
										maxLength: 5,
									}}
									required
								/>
								<CardActions>
									<Button
										onClick={this.submitWeight}
										variant='contained'
										color='primary'>
										Submit
									</Button>
								</CardActions>
							</form>
						)}

						{!this.state.needMacros ? (
							<h3>Thank you for submitting your macros today!</h3>
						) : (
							<form className='client-landing-daily-inputs--right'>
								<h3>Macros & Exercise</h3>
								{this.createInputList()}
								<TextField
									name='exercise-type'
									label='Exercise Type'
									type='text'
									margin='normal'
									onChange={this.updateMacrosExercise}
								/>
								<TextField
									name='notes'
									label='Notes'
									type='text'
									margin='normal'
									multiline
									rows='2'
									onChange={this.updateMacrosExercise}
								/>
								<CardActions>
									<Button variant='contained' color='primary'>
										Submit
									</Button>
								</CardActions>
							</form>
						)}
					</div>
				</CardContent>
			</Card>
		);
	}
}
