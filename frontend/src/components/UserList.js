import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setMessage(data.message);
      }
    };

    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    });

    const data = await response.json();
    if (response.ok) {
      setUsers(users.map(user => (user._id === id ? data.user : user)));
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.role}
            <button onClick={() => updateRole(user._id, 'admin')}>Make Admin</button>
            <button onClick={() => updateRole(user._id, 'user')}>Make User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
