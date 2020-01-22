import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';

export default function ProfileForm({ client }) {
	return (
		<FormControl>
			<InputLabel htmlFor='my-input'>Email address</InputLabel>
			<Input id='my-input' aria-describedby='my-helper-text' />
		</FormControl>
	);
}
