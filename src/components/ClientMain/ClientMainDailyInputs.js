import React from 'react';

import ClientMainWeight from './ClientMainWeight';
import ClientMainMacros from './ClientMainMacros';
import ClientMainExercise from './ClientMainExercise';

export default function ClientMainDailyInputs({ client }) {
	return (
		<div className='client-main--daily-card'>
			<h2>Update Today's Numbers</h2>
			<div className='client-landing-daily-inputs'>
				<ClientMainWeight client={client} />
				<ClientMainMacros client={client} />
				<ClientMainExercise client={client} />
			</div>
		</div>
	);
}

/* <Card className='client-main--daily-card' elevation={3}>
<CardContent>
	<h2>Update Today's Numbers</h2>
	<div className='client-landing-daily-inputs'>
		<ClientMainWeight client={client} />
		<ClientMainMacros client={client} />
		<ClientMainExercise client={client} />
	</div>
</CardContent>
</Card> */
