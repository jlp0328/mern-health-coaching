import React, { useState, useEffect } from 'react';

export default function StaticProfile({ client }) {
	const [clientInfo, setClientInfo] = useState({});

	useEffect(() => {
		setClientInfo(client);
	}, [client]);

	return (
		<div>
			<h2>
				{client.firstname} {client.lastname}
			</h2>
			<p>
				<span>Birthday: </span>
				<span>{client.dob}</span>
			</p>
			<p>
				<span>Phone: </span>
				<span>{client.phone}</span>
			</p>
			<p>
				<span>Email: </span>
				<span>{client.email}</span>
			</p>
			<p>
				<span>Weekly Check-In Day: </span>
				<span>{client.checkinday}</span>
			</p>
			<p>
				<span>Coach: </span>
				<span>{client.coach}</span>
			</p>
		</div>
	);
}
