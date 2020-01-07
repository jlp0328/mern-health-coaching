import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { isNumberKey } from '../../Common';

export default function ClientMainWeight({ client, date }) {
	const [weight, setWeight] = useState({
		user: '',
		date: '',
		weight: 0,
	});
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [needWeight, setNeedWeight] = useState(true);
	const [loading, setLoading] = useState(true);
	const [errorOnPage, setErrorOnPage] = useState(false);

	useEffect(() => {
		async function checkForWeightEntry() {
			try {
				const entry = await fetchData(client, date);
				setNeedWeight(isEmpty(entry.data) ? true : false);

				setWeight({
					user: client._id,
					date: moment.utc(date.setHours(0, 0, 0, 0)).format(),
					weight: isEmpty(entry.data) ? 0 : entry.data.weight,
				});

				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		checkForWeightEntry();
	}, [client, date]);

	const updateWeight = e => {
		setWeight({
			user: client._id,
			date: moment.utc(date.setHours(0, 0, 0, 0)).format(),
			weight: e.target.value,
		});

		setSubmitDisabled(e.target.value.length < 3);
	};

	const submitWeight = async e => {
		//Should something be setup in the service to then calculate the weekly average?
		e.preventDefault();

		setLoading(true);

		try {
			await axios.post(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
				weight,
			);
			setLoading(false);
			setNeedWeight(false);
			setErrorOnPage(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
			setErrorOnPage(true);
			setSubmitDisabled(true);
		}
	};

	const renderDate = date => {
		return moment(date).format('dddd, MMMM Do, YYYY');
	};

	const weightFormRender = () => {
		if (needWeight) {
			return (
				<form className='client-landing-daily-inputs--weight'>
					<TextField
						label='Weight'
						type='text'
						margin='normal'
						onChange={updateWeight}
						onKeyPress={isNumberKey}
						inputProps={{
							minLength: 2,
							maxLength: 5,
						}}
						required
					/>
					<CardActions>
						<Button
							disabled={submitDisabled}
							onClick={submitWeight}
							variant='contained'
							color='primary'>
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
				<h4>{`Thank you for submitting your weight for ${renderDate(
					weight.date,
				)}!`}</h4>
			);
		}
	};

	return (
		<Card elevation={3}>
			<CardContent>
				{loading ? <CircularProgress /> : weightFormRender()}
			</CardContent>
		</Card>
	);
}

async function fetchData(client, date) {
	let dateFormatted = moment.utc(date.setHours(0, 0, 0, 0)).format();

	let entryForDate;

	try {
		entryForDate = await axios.get(
			`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${client._id}/${dateFormatted}`,
		);
	} catch (error) {
		console.log(error);
	}

	return entryForDate;
}
