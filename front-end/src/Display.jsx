import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Display() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user session

  // Check user session on component mount
  useEffect(() => {
    // Check if the user is logged in (assuming a /session endpoint that returns the session status)
    // axios.get('http://localhost:8000/session')
    //   .then((response) => {
    //     setIsLoggedIn(response.data.loggedin); // Assuming the response has a loggedIn field
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching session status:", error);
    //   });

    // Fetch the data for the users
    axios.get('http://localhost:8000/databa')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle user logout
  const handleLogout = () => {
    axios.post('http://localhost:8000/logout')
      .then(() => {
        setIsLoggedIn(false); // Update state to reflect logged out status
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/delete/${id}`)
      .then(() => {
        // Remove deleted item from local state instead of reloading the page
        setData(data.filter(user => user.id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <p>Welcome:</p>
      {/* Session Button */}
      <div className="flex justify-between mb-4">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>) : (<Link to="/">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Logout</button></Link>)}
           <Link to ="/addnew"> <button className="bg-blue-500 text-white px-5 py-1 rounded hover:bg-blue-600">Add New</button></Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Names</th>
            <th className="px-4 py-2 border">E-mail</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Password</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val,i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center">{i+1}</td>
              <td className="px-4 py-2 border">{val.names}</td>
              <td className="px-4 py-2 border">{val.email}</td>
              <td className="px-4 py-2 border">{val.username}</td>
              <td className="px-4 py-2 border">{val.password}</td>
              <td className="px-4 py-2 border flex gap-2 justify-center">
                <Link to={`/updateusers/${val.id}`}>
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Update</button>
                </Link>
                <button
                  onClick={() => handleDelete(val.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Display;
