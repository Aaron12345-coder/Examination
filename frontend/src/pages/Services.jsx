import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ServicesTable() {
  const [services, setServices] = useState([]);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/services');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

      const Deleteservice = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/deleteservice/${id}`);
            alert('Record deleted successfully!');
            window.location.reload(); // Reload records after deletion
        } catch (err) {
            console.error(err);
            alert('Error deleting record');
        }
    }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Service List</h2>
        {/* Add Service button */}
        <Link to="/addservice">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Service
          </button>
        </Link>
      </div>
      
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Car Type</th>
            <th className="border px-4 py-2">Price (Rwf)</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.service}</td>
              <td className="border px-4 py-2">{item.carType}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="px-4 py-2 border"><Link to={`/updateservice/${item.id}`}><button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 mr-2">Update</button></Link>
              <button onClick={() => Deleteservice(item.id)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-300">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesTable;
