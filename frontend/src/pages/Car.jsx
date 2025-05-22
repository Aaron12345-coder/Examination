import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Car() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user session
  const navigate = useNavigate();

  // Check user session on component mount
useEffect(() => {
  const user = sessionStorage.getItem('user');
  if (!user) {
    navigate('/car');
    return;
  }

  axios.get('http://localhost:8000/car', { withCredentials: true })
    .then((response) => {
      setData(response.data);
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      navigate('/car');
    });
}, [navigate]);

    const DeleteCar = async (PlateNumber_id) => {
        try {
            await axios.delete(`http://localhost:8000/deletecar/${PlateNumber_id}`);
            alert('Record deleted successfully!');
            loadRecords(); // Reload records after deletion
        } catch (err) {
            console.error(err);
            alert('Error deleting record');
        }
    }
  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div>     
        <h2 className="text-2xl font-bold mb">Car List</h2>
                <Link to="/addnewcar">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-235 w-28 mb-5">
                   Add Car
                  </button>
                </Link>
                </div>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">PlateNumber</th>
            <th className="px-4 py-2 border">CarType</th>
            <th className="px-4 py-2 border">CarSize</th>
            <th className="px-4 py-2 border">DriverName</th>
            <th className="px-4 py-2 border">PhoneNumber</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, i) => (
            <tr key={i} className="hover:bg-gray-50 ">
              <td className="px-4 py-2 border">{i+1}</td>
              <td className="px-4 py-2 border">{val.CarType}</td>
              <td className="px-4 py-2 border">{val.CarSize}</td>
              <td className="px-4 py-2 border">{val.DriverName}</td>
              <td className="px-4 py-2 border">{val.PhoneNumber}</td>
              <td className="px-4 py-2 border"><Link to={`/updatecar/${val.PlateNumber_id}`}> <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 mr-2">Update</button></Link>
              <button onClick={() => DeleteCar(val.PlateNumber_id)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-300">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Car;
