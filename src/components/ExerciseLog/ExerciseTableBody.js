import React, { useState, useEffect } from 'react';
import { findIndex } from 'lodash';
import { isNumberKey, updateLogData } from '../../Common';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const exerciseFields = ['cardiotime', 'cardiotype', 'addtltraining', 'notes'];

export default function ExerciseTableBody({ rows }) {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		setEntries(rows);
	}, [rows]);

	const editSaveExercise = (row, save = true) => {
		let update = [...entries];
		let index = findIndex(update, row);
		update[index].editable = save ? false : true;

		if (save) {
			let updatedExercise = row;
			exerciseFields.forEach(elem => {
				update[index].elem = updatedExercise[elem] = document.getElementById(
					`${row._id}-${elem}`,
				).value;
			});

			updateLogData(updatedExercise, 'exercise');
		}
		setEntries(update);
	};

	return (
		<TableBody>
			{entries.map(row => {
				return (
					<TableRow hover tabIndex={-1} key={row._id}>
						<TableCell align='center'>{row.displayDate}</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={`${row._id}-cardiotime`}
									onKeyPress={isNumberKey}
									defaultValue={row.cardiotime}
								/>
							) : (
								row.cardiotime
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={`${row._id}-cardiotype`}
									defaultValue={row.cardiotype}
								/>
							) : (
								row.cardiotype
							)}
						</TableCell>
						<TableCell align='center'>
							{row.editable ? (
								<TextField
									id={`${row._id}-addtltraining`}
									defaultValue={row.addtltraining}
								/>
							) : (
								row.addtltraining
							)}
						</TableCell>
						<TableCell className='' align='center'>
							{row.editable ? (
								<TextField id={`${row._id}-notes`} defaultValue={row.notes} />
							) : (
								row.notes
							)}
						</TableCell>
						<TableCell className='' align='center'>
							{row.editable ? (
								<Button
									variant='contained'
									size='small'
									color='primary'
									onClick={() => {
										editSaveExercise(row);
									}}>
									Save
								</Button>
							) : (
								<Fab aria-label='edit' size='small' color='secondary'>
									<EditIcon
										onClick={() => {
											editSaveExercise(row, false);
										}}
									/>
								</Fab>
							)}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
