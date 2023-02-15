import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleViewDetails = (id) => {
    setExpandedRowId(id === expandedRowId ? null : id);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>City</th>
          <th>Street</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <tr>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address.city}</td>
              <td>{user.address.street}</td>
              <td>
                <button onClick={() => handleViewDetails(user.id)}>View Details</button>
              </td>
            </tr>
            {expandedRowId === user.id && (
              <tr>
                <td colSpan="5">
                  <div className="user-details">
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Website: {user.website}</div>
                    <div>
                      Company: {user.company.name}, {user.company.catchPhrase}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
