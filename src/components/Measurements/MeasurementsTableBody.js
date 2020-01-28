import React, { useState, useEffect } from 'react';
import { findIndex, isNaN } from 'lodash';
import { createDisplayDate, isNumberKey, updateLogData } from '../../Common';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const measurementColHeaders = [
	'weight',
	'rightarm',
	'rightleg',
	'hips',
	'waist',
	'bust',
	'bodyfat',
	'other',
];

export default function MeasurementsTableBody({ rows, average }) {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		setEntries(rows);
	}, [rows]);

	const editWeightToggle = row => {
		let update = [...entries];
		let index = findIndex(update, row);
		update[index].editable = true;
		setEntries(update);
	};

	const saveUpdatedWeight = row => {
		let updatedWeight = parseFloat(document.getElementById(row._id).value);
		let update = [...entries];
		let index = findIndex(update, row);
		update[index].editable = false;

		if (!isNaN(updatedWeight)) {
			update[index].weight = row.weight = updatedWeight;
			updateLogData(row, 'weight');
		}
		setEntries(update);
		updateWeightAvg();
	};

	const updateWeightAvg = () => {
		average(rows);
	};

	const generateTableCells = row => {
		let { _id, user, createdAt, updatedAt, ...filteredRow } = row;
		// filteredRow.date =

		return Object.entries(filteredRow).map(([key, value]) => {
			return (
				<TableCell align='center'>
					{row.editable ? (
						<TextField
							id={`${row._id}-${key}`}
							onKeyPress={isNumberKey}
							defaultValue={value}
						/>
					) : (
						value
					)}
				</TableCell>
			);
		});
	};

	return (
		<TableBody>
			{entries.map(row => {
				return (
					<TableRow hover tabIndex={-1} key={row._id}>
						{generateTableCells(row)}
						{/* <TableCell align='center'>{row.displayDate}</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.weight}
								/>
							) : (
								row.weight
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.rightarm}
								/>
							) : (
								row.rightarm
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.rightleg}
								/>
							) : (
								row.rightleg
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.hips}
								/>
							) : (
								row.hips
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.waist}
								/>
							) : (
								row.waist
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.bust}
								/>
							) : (
								row.bust
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={row._id}
									onKeyPress={isNumberKey}
									defaultValue={row.bust}
								/>
							) : (
								row.bust
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<Button
									variant='contained'
									size='small'
									color='primary'
									onClick={() => {
										saveUpdatedWeight(row);
									}}>
									Save
								</Button>
							) : (
								<Fab aria-label='edit' size='small' color='secondary'>
									<EditIcon
										onClick={() => {
											editWeightToggle(row);
										}}
									/>
								</Fab>
							)}
						</TableCell> */}
					</TableRow>
				);
			})}
		</TableBody>
	);
}
