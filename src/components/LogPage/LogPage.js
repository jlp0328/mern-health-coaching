import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { orderBy, isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import LogTable from './LogTable';

export default function LogPage({ client, type }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let entries = await axios.get(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/${type}-log/${client._id}`,
			);

			const orderedEntries = orderBy(entries.data, ['date'], ['desc']);
			orderedEntries.forEach(entry => {
				entry.displayDate = moment(entry.date).format('dddd, MMMM Do, YYYY');
				entry.editable = false;
			});

			setRows(orderedEntries);
		}

		fetchData();
	}, [client, type]);

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(e.target.value);
		setPage(0);
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	return (
		<div>
			<Paper>
				<TableContainer>
					<LogTable
						rows={rows}
						rowsPerPage={rowsPerPage}
						page={page}
						type={type}
					/>
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					page={page}
					onChangePage={handleChangePage}
				/>
			</Paper>
		</div>
	);
}
