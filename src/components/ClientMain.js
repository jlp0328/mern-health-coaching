import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

//Subcomponents
import ClientMainSummaryCard from './subcomponents/ClientMainSummaryCard';
import ClientMainDailyInputs from './subcomponents/ClientMainDailyInputs';

const dateFormat = require('dateformat');
const DATE_NOW = dateFormat(new Date(), 'fullDate');

export default class ClientMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			client: {},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.client !== prevState.client) {
			return {
				client: nextProps.client,
			};
		}
		return;
	}

	render() {
		return (
			<Paper className='' square={false}>
				<h1>{DATE_NOW}</h1>
				<ClientMainSummaryCard client={this.state.client.goals} />
				<ClientMainDailyInputs client={this.state.client.personal} />
			</Paper>
		);
	}
}
