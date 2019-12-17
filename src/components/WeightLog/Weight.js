import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';

import Datepicker from '../Datepicker/Datepicker';

const columns = [
	{ id: 'weight-log-date', label: 'Date', minWidth: 170 },
	{ id: 'weight-log-weight', label: 'Weight', minWidth: 100 },
];

export default class Weight extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 10,
			rows: [],
			client: {},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps);
		if (nextProps.client !== prevState.client) {
			return {
				client: nextProps.client,
			};
		}
		return;
	}

	async componentDidMount() {
		// const weightEntries = await axios.get(
		// 	`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${this.state.client.data._id}`,
		// );
		// console.log(weightEntries);
	}

	render() {
		return (
			<div>
				<Datepicker />
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									{columns.map(column => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.rows.map(row => {
									return (
										<TableRow
											hover
											role='checkbox'
											tabIndex={-1}
											key={row.code}>
											{columns.map(column => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={this.state.rows.length}
						rowsPerPage={this.rowsPerPage}
						page={this.page}
					/> */}
				</Paper>
			</div>
		);
	}
}
