/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './LogPageTable.css';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import MacrosTableBody from '../MacrosLog/MacrosTableBody';
import MeasurementsTableBody from '../Measurements/MeasurementsTableBody';
import WeightTableBody from '../WeightLog/WeightTableBody';
import ExerciseTableBody from '../ExerciseLog/ExerciseTableBody';

//Columns
import macrosColumns from './data/macro-columns.json';
import measurementColumns from './data/measurements-columns.json';
import exerciseColumns from './data/exercise-columns.json';
import weightColumns from './data/weight-columns.json';

import { orderBy } from 'lodash';

export default function LogTable({ rows, type }) {
	const [sort, setSort] = useState('desc');
	const [data, setData] = useState(rows);
	const [columns, setColumns] = useState([]);
	const [average, setAverage] = useState(0);

	const columnHeaders = new Map();
	columnHeaders.set('weight', weightColumns);
	columnHeaders.set('macros', macrosColumns);
	columnHeaders.set('exercise', exerciseColumns);
	columnHeaders.set('measurements', measurementColumns);

	const calculateWeeklyWeightAvg = () => {
		let weightOnly = [];
		data.forEach(elem => {
			weightOnly.push(elem.weight);
		});

		let calcAvg = (weightOnly.reduce((a, b) => a + b) / data.length).toFixed(2);

		setAverage(calcAvg);
	};

	const tableType = new Map();
	tableType.set(
		'weight',
		<WeightTableBody rows={data} average={calculateWeeklyWeightAvg} />,
	);
	tableType.set('macros', <MacrosTableBody rows={data} />);
	tableType.set('exercise', <ExerciseTableBody rows={data} />);
	tableType.set('measurements', <MeasurementsTableBody rows={data} />);

	useEffect(() => {
		setData(rows);
		if (type === 'weight') {
			calculateWeeklyWeightAvg();
		}
	}, [rows]);

	useEffect(() => {
		setColumns(columnHeaders.get(type));
	}, [type, columnHeaders]);

	const sortByDate = () => {
		let sortOrder = sort === 'desc' ? 'asc' : 'desc';
		let newOrder = orderBy(data, ['date'], [sortOrder]);
		setSort(sortOrder);
		setData(newOrder);
	};

	return (
		<div>
			<Table stickyHeader aria-label='sticky table'>
				<TableHead>
					{type === 'macros' && (
						<TableRow>
							<TableCell colSpan={5} align='center'>
								Goals
							</TableCell>
							<TableCell colSpan={4} align='center'>
								Actual
							</TableCell>
							<TableCell colSpan={5} align='center'>
								Difference
							</TableCell>
						</TableRow>
					)}
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={column.id}
								align='center'
								className={column.divider ? 'macros-log--divider' : ''}
								style={{
									minWidth: column.minWidth,
								}}>
								{column.label === 'Date' && (
									<TableSortLabel
										direction={sort}
										active={column.sort}
										onClick={sortByDate}></TableSortLabel>
								)}
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				{tableType.get(type)}
			</Table>
			{type === 'weight' && <h3>{`Weekly average: ${average}`}</h3>}
		</div>
	);
}
