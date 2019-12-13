import React from 'react';

import TextField from '@material-ui/core/TextField';
import { isNumberKey, isAnyKey } from '../../Common';

export default function DailyInputField({
	attributes: {
		label,
		name,
		required,
		type,
		inputProps,
		isNum,
		multiline,
		rows,
	},
	change,
}) {
	const detectNum = isNum ? isNumberKey : isAnyKey;

	return (
		<TextField
			label={label}
			name={name}
			type={type}
			margin='normal'
			inputProps={inputProps}
			required={required}
			multiline={multiline}
			rows={rows}
			onKeyPress={detectNum}
			onChange={change}
		/>
	);
}
