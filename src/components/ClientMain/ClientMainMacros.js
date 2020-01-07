import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { isEmpty, isNull } from 'lodash';

import DailyInputsFields from './DailyInputsFields';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const inputData = require('./data/macros-inputs.json');

export default function ClientMainMacros({ client, date }) {
	const [macrosData, setMacrosData] = useState({
		user: '',
		date: '',
		carbs: '',
		protein: '',
		fat: '',
		fiber: '',
	});
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [needMacros, setNeedMacros] = useState(true);
	const [loading, setLoading] = useState(true);
	const [errorOnPage, setErrorOnPage] = useState(false);

	useEffect(() => {
		async function checkForMacrosEntry() {
			try {
				const entry = await fetchData(client, date);
				setNeedMacros(isEmpty(entry.data) ? true : false);

				setMacrosData({
					user: client._id,
					date: moment.utc(date.setHours(0, 0, 0, 0)).format(),
					carbs: '',
					protein: '',
					fat: '',
					fiber: '',
				});

				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		checkForMacrosEntry();
	}, [client, date]);

	const createInputList = () => {
		return inputData.map((elem, index) => {
			return (
				<DailyInputsFields
					key={index}
					attributes={elem}
					change={updateMacros}
				/>
			);
		});
	};

	const updateMacros = e => {
		let update = macrosData;
		update[e.target.name] = parseInt(e.target.value);
		setMacrosData(update);
		disableSubmit(e);
	};

	const disableSubmit = e => {
		let disable =
			Object.values(macrosData).includes('') ||
			Object.values(macrosData).includes(NaN) ||
			e.target.value === '';

		setSubmitDisabled(disable);
	};

	const submitMacros = async e => {
		e.preventDefault();

		try {
			await axios.post(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/daily-log`,
				macrosData,
			);

			setLoading(false);
			setNeedMacros(false);
			setErrorOnPage(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setErrorOnPage(true);
			setSubmitDisabled(true);
		}
	};

	const renderDate = date => {
		return moment(date).format('dddd, MMMM Do, YYYY');
	};

	const macrosFormRender = () => {
		if (needMacros) {
			return (
				<form noValidate className='client-landing-daily-inputs--macros'>
					{createInputList()}
					<CardActions>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							disabled={submitDisabled}
							onClick={submitMacros}>
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
				<h4>{`Thank you for submitting your macros for ${renderDate(
					macrosData.date,
				)}!`}</h4>
			);
		}
	};

	return (
		<Card elevation={3}>
			<CardContent>
				{loading ? <CircularProgress /> : macrosFormRender()}
			</CardContent>
		</Card>
	);
}

async function fetchData(client, date) {
	let dateFormatted = moment.utc(date.setHours(0, 0, 0, 0)).format();

	let entryForDate;

	try {
		entryForDate = await axios.get(
			`http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/${client._id}/${dateFormatted}`,
		);
	} catch (error) {
		console.log(error);
	}

	return entryForDate;
}
