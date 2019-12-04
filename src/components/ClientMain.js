import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

//Subcomponents
import ClientMainSummaryCard from './subcomponents/ClientMainSummaryCard';
import ClientMainDailyInputs from './subcomponents/ClientMainDailyInputs';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function ClientMain() {
	const classes = useStyles();

	return (
		<Paper className={classes.card} square={false}>
			<h1>Main Page</h1>
			<ClientMainSummaryCard />
			<ClientMainDailyInputs />
		</Paper>
	);
}
