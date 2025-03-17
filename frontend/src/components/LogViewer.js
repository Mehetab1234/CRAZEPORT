import React, { useEffect, useState } from 'react';

const LogViewer = ({ serverId }) => {
  const [logs, setLogs] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/servers/${serverId}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.text();
      if (response.ok) {
        setLogs(data);
      } else {
        setMessage(data.message);
      }
    };

    fetchLogs();
  }, [serverId]);

  return (
    <div>
      <h2>Server Logs</h2>
      {message && <p>{message}</p>}
      <pre>{logs}</pre>
    </div>
  );
};

export default LogViewer;
