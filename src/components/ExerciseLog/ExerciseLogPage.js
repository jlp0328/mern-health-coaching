import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { orderBy, groupBy, find, merge } from 'lodash';
import { createDisplayDate } from '../../Common';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

import LogTable from '../LogPage/LogTable';

export default function ExerciseLogPage({ client, goals, type }) {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let [macros, goals] = await axios.all([
				getAllMacrosEntries(client, type),
				getAllGoalsEntries(client),
			]);

			macros.data.forEach((elem, index) => {
				let macros = find(goals.data, { startofweek: elem.startofweek });
				elem = merge(elem, macros);
				elem.unique = index;
			});

			const orderedEntries = orderBy(macros.data, ['date'], ['desc']);
			orderedEntries.forEach(entry => {
				entry.displayDate = createDisplayDate(entry.date);
				entry.editable = false;
			});

			console.log(orderedEntries);

			setRows(orderedEntries);
		}

		fetchData();
	}, [client, type]);

	const getAllMacrosEntries = (client, type) => {
		return axios.get(
			`http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/${type}-log/${client._id}`,
		);
	};

	const getAllGoalsEntries = (client, type) => {
		return axios.get(
			`http://${process.env.REACT_APP_BACKEND_IP}:5000/clients/goals-log/${client._id}`,
		);
	};

	const renderTables = () => {
		let groupedEntries = groupBy(rows, 'startofweek');

		return (
			<div className=''>
				{Object.entries(groupedEntries).map(([key, values]) => (
					<div key={key}>
						<div className='weight-log-page--week-and-avg'>
							<h2>{`Check-In Week: ${createDisplayDate(key, true)}`}</h2>
						</div>
						<Paper>
							<TableContainer>
								<LogTable rows={values} type={type} />
							</TableContainer>
						</Paper>
					</div>
				))}
			</div>
		);
	};

	return renderTables();
}
