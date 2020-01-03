import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import axios from 'axios';
import moment from 'moment';
import { orderBy, isEmpty, chunk, groupBy, forIn, flattenDeep } from 'lodash';

import Datepicker from '../Datepicker/Datepicker';
import WeightLogTable from './WeightLogTable';

export default function Weight({ client }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [rows, setRows] = useState([]);
	const [clientInfo, setClientInfo] = useState({});

	useEffect(() => {
		async function fetchData() {
			setClientInfo(client);
			let weightEntries = await axios.get(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/weight-log/${client._id}`,
			);

			const orderedEntries = orderBy(weightEntries.data, ['date'], ['desc']);
			orderedEntries.forEach(entry => {
				entry.displayDate = moment(entry.date).format('dddd, MMMM Do, YYYY');
				entry.editable = false;
			});

			let getAverage = groupBy(orderedEntries, 'week');
			forIn(getAverage, (values, key) => {
				let avg =
					values.reduce((sum, { weight }) => sum + weight, 0) / values.length;
				getAverage[key].push({ week: key, average: avg, editable: false });
			});
			console.log(getAverage);

			setRows(getAverage);
			// setRows(orderedEntries);
		}

		fetchData();
	}, [client]);

	function handleChangeRowsPerPage(e) {
		setRowsPerPage(e.target.value);
		setPage(0);
	}

	function handleChangePage(e, newPage) {
		setPage(newPage);
	}

	return (
		<div>
			{/* <Datepicker /> */}
			<Paper>
				<TableContainer>
					<WeightLogTable rows={rows} rowsPerPage={rowsPerPage} page={page} />
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[
						7,
						14,
						25,
						50,
						100,
						{ value: rows.length, label: 'All' },
					]}
					component='div'
					count={1000}
					rowsPerPage={rowsPerPage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					page={page}
					onChangePage={handleChangePage}
				/>
			</Paper>
		</div>
	);
}
