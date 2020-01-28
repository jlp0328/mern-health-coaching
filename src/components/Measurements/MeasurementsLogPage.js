import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { orderBy, groupBy } from 'lodash';
import { createDisplayDate } from '../../Common';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

import LogTable from '../LogPage/LogTable';

export default function MeasurementsLogPage({ client, type }) {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let entries = await axios.get(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/${type}-log/${client._id}`,
			);

			const orderedEntries = orderBy(entries.data, ['date'], ['desc']);
			orderedEntries.forEach(entry => {
				entry.editable = false;
			});

			setRows(orderedEntries);
		}

		fetchData();
	}, [client, type]);

	const renderTables = () => {
		// let groupedEntries = groupBy(rows, 'startofweek');
		console.log(rows);

		return (
			<div className=''>
				<div>
					<div className='weight-log-page--week-and-avg'>
						<h2>Monthly Measurements</h2>
					</div>
					<Paper>
						<TableContainer>
							<LogTable rows={rows} type={type} />
						</TableContainer>
					</Paper>
				</div>
			</div>
		);
	};

	return renderTables();
}
