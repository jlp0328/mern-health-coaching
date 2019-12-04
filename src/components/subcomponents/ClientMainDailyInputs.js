import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

export default class ClientMainDailyInputs extends Component {
	render() {
		return (
			<Card>
				<CardContent>
					<h3>Update Today's Numbers</h3>
					<div className='client-landing-daily-inputs'>
						<form className='client-landing-daily-inputs--left'>
							<TextField
								label='Weight'
								type='number'
								autoComplete='145'
								margin='normal'
							/>
						</form>
						<form className='client-landing-daily-inputs--right'>
							<TextField
								label='Carbs'
								type='number'
								autoComplete='145'
								margin='normal'
							/>
							<TextField
								label='Protein'
								type='number'
								autoComplete='145'
								margin='normal'
							/>
							<TextField
								label='Fat'
								type='number'
								autoComplete='57'
								margin='normal'
							/>
							<TextField
								label='Fiber'
								type='number'
								autoComplete='25'
								margin='normal'
							/>
							<TextField
								label='Exercise'
								type='text'
								margin='normal'
								multiline
								rows='4'
							/>
							<TextField
								label='Notes'
								type='text'
								margin='normal'
								multiline
								rows='4'
							/>
						</form>
					</div>
				</CardContent>
			</Card>
		);
	}
}
