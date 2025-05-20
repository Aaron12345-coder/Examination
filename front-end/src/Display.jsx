import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Display() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user session
  const navigate = useNavigate();

  // Check user session on component mount
useEffect(() => {
  const user = sessionStorage.getItem('user');
  if (!user) {
    navigate('/');
    return;
  }

  axios.get('http://localhost:8000/databa', { withCredentials: true })
    .then((response) => {
      setData(response.data);
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      navigate('/');
    });
}, [navigate]);

  // Handle user logout
  const handleLogout = () => {
    // Clear sessionStorage and update the logged-in state
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/display'); // Redirect to login after logout
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
      <div>     
        <h2 className="text-2xl font-bold mb">Users List</h2>
                <Link to="/addnew">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-250 w-28 mb-5">
                   Add User
                  </button>
                </Link>
                </div>
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
          {data.map((val, i) => (
            <tr key={i} className="hover:bg-gray-50 ">
              <td className="px-4 py-2 border text-center">{i + 1}</td>
              <td className="px-4 py-2 border">{val.names}</td>
              <td className="px-4 py-2 border">{val.email}</td>
              <td className="px-4 py-2 border">{val.username}</td>
              <td className="px-4 py-2 border">{val.password}</td>
              <td className="px-4 py-2 border flex gap-2 justify-center">
                <Link to={`/updateusers/${val.id}`}>
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                    Update
                  </button>
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
