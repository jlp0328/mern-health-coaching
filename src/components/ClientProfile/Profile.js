import React, { useState, useEffect } from 'react';
import './Profile.css';
import ProfileForm from './ProfileForm';
import StaticProfile from './StaticProfile';

export default function Profile({ client }) {
	const [clientInfo, setClientInfo] = useState({});
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		setClientInfo(client);
	}, [client]);

	return (
		<div className='client-profile-container'>
			<img
				className='profile--pic'
				src={`https://unavatar.now.sh/instagram/${clientInfo.instagram}`}
				alt={client.firstname}
			/>
			{editMode ? (
				<ProfileForm client={clientInfo} />
			) : (
				<StaticProfile client={clientInfo} />
			)}
		</div>
	);
}
