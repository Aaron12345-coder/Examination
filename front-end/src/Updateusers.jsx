import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function UpdateUsers() {
  const { id } = useParams();
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

useEffect(() => {
  axios.get(`http://localhost:8000/users/${id}`, {
    withCredentials: true
  })
    .then((res) => {
      setNames(res.data.names);
      setEmail(res.data.email);
      setUsername(res.data.username);
      setPassword(res.data.password);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
    });
}, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
   axios.put(`http://localhost:8000/users/${id}`, {
  names,
  email,
  username,
  password
}, {
  withCredentials: true
})
  .then(() => {
    alert("User updated successfully!");
  })
  .catch((err) => {
    console.error("Update error:", err);
  });

  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label htmlFor="names" className="block text-sm font-medium text-gray-700">Names</label>
          <input
            type="text"
            id="names"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <Link
            to="/display"
            className="text-sm text-blue-600 hover:underline"
          >
            Back To List
          </Link>
        </div>

      </form>
    </div>
  );
}

export default UpdateUsers;
