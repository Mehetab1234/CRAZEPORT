import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogViewer from './LogViewer';

const ServerDetails = () => {
  const { id } = useParams();
  const [server, setServer] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchServer = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/servers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setServer(data);
      } else {
        setMessage(data.message);
      }
    };

    fetchServer();
  }, [id]);

  const handleStart = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/servers/${id}/start`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (response.ok) {
      setServer({ ...server, status: 'running' });
    } else {
      setMessage(data.message);
    }
  };

  const handleStop = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/servers/${id}/stop`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (response.ok) {
      setServer({ ...server, status: 'stopped' });
    } else {
      setMessage(data.message);
    }
  };

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{server.name}</h1>
      <p>Status: {server.status}</p>
      <button onClick={handleStart}>Start Server</button>
      <button onClick={handleStop}>Stop Server</button>
      {message && <p>{message}</p>}
      <LogViewer serverId={id} />
    </div>
  );
};

export default ServerDetails;
