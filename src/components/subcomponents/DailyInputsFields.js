import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function MacrosInput(props) {
	return (
		<TextField
			label={props.label}
			name={props.name}
			type={props.type}
			margin='normal'
			inputProps={{
				minLength: 2,
				maxLength: 5,
			}}
			required={props.required}
		/>
	);
}
