import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';

import DailyInputsFields from './DailyInputsFields';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const inputData = require('./data/exercise-inputs.json');

export default function ClientMainExercise({ client, date }) {
	const [exerciseData, setExerciseData] = useState({
		user: '',
		date: '',
		cardiotime: 0,
		cardiotype: '',
		addtltraining: '',
		notes: null,
	});
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [needExercise, setNeedExercise] = useState(true);
	const [loading, setLoading] = useState(true);
	const [errorOnPage, setErrorOnPage] = useState(false);

	useEffect(() => {
		async function checkForExerciseEntry() {
			try {
				const entry = await fetchData(client, date);
				setNeedExercise(isEmpty(entry.data) ? true : false);

				setExerciseData({
					user: client._id,
					date: moment.utc(date.setHours(0, 0, 0, 0)).format(),
					cardiotime: 0,
					cardiotype: '',
					addtltraining: '',
					notes: null,
				});

				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		checkForExerciseEntry();
	}, [client, date]);

	const submitExercise = async e => {
		e.preventDefault();

		setLoading(true);

		try {
			await axios.post(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/daily-log`,
				exerciseData,
			);
			setLoading(false);
			setNeedExercise(false);
			setErrorOnPage(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setErrorOnPage(true);
			setSubmitDisabled(true);
		}
	};

	const updateExercise = e => {
		let update = exerciseData;

		if (e.target.name === 'notes' && e.target.value === '') {
			update[e.target.name] = null;
		} else {
			update[e.target.name] =
				e.target.name === 'cardiotime'
					? parseInt(e.target.value)
					: e.target.value;
		}

		setExerciseData(update);
		toggleSubmitButton(e);
	};

	const toggleSubmitButton = e => {
		console.log(exerciseData);
		let disable =
			Object.values(exerciseData).includes('') ||
			Object.values(exerciseData).includes(NaN);

		setSubmitDisabled(disable);
	};

	const createInputList = () => {
		return inputData.map((elem, index) => {
			return (
				<DailyInputsFields
					key={index}
					attributes={elem}
					change={updateExercise}
				/>
			);
		});
	};

	const renderDate = date => {
		return moment(date).format('dddd, MMMM Do, YYYY');
	};

	const exerciseFormRender = () => {
		if (needExercise) {
			return (
				<form noValidate className='client-landing-daily-inputs--exercise'>
					{createInputList()}
					<CardActions>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							disabled={submitDisabled}
							onClick={submitExercise}>
							Submit
						</Button>
					</CardActions>
					{errorOnPage && (
						<p>There was an error with your submission. Please try again.</p>
					)}
				</form>
			);
		} else {
			return (
				<h4>{`Thank you for submitting your exercise for ${renderDate(
					exerciseData.date,
				)}!`}</h4>
			);
		}
	};

	return (
		<Card elevation={3}>
			<CardContent>
				{loading ? <CircularProgress /> : exerciseFormRender()}
			</CardContent>
		</Card>
	);
}

async function fetchData(client, date) {
	let dateFormatted = moment.utc(date.setHours(0, 0, 0, 0)).format();

	let entryForDate;

	try {
		entryForDate = await axios.get(
			`http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/${client._id}/${dateFormatted}`,
		);
	} catch (error) {
		console.log(error);
	}

	return entryForDate;
}
