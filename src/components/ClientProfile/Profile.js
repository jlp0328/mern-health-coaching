import React, { useState, useEffect } from 'react';
import './Profile.css';

export default function Profile({ client }) {
  const [clientInfo, setClientInfo] = useState({});

  useEffect(() => {
    setClientInfo(client);
  }, [client]);

  return (
    <div>
      <img
        className='profile--pic'
        src={`https://unavatar.now.sh/instagram/${clientInfo.instagram}`}
        alt={client.firstname}
      />
    </div>
  );
}
