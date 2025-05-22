import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Addnewcar() {
  const [PlateNumber_id, setPlateNumber_id] = useState('');
  const [CarType, setCarType] = useState('');
  const [CarSize, setCarSize] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();

    if (!PlateNumber_id ||  !CarType || !CarSize || !DriverName || !PhoneNumber) {
      setError('All fields are required');
      return;
    }

    setError('');

    axios.post('http://localhost:8000/api/car', {
      PlateNumber_id,
      CarType,
      CarSize,
      DriverName,
      PhoneNumber
    })
      .then(() => {
        alert("Car registered successfully!");
        navigate('/car');
      })
      .catch((err) => {
        console.error(err);
        setError('Error registering car. Please try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-md">
      <form onSubmit={Submit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register New Car</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <label className="block text-sm font-medium text-gray-700 mt-4">PlateNumber</label>
        <input
          type="text"
          value={PlateNumber_id}
          onChange={(e) => setPlateNumber_id(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Car Type</label>
        <input
          type="text"
          value={CarType}
          onChange={(e) => setCarType(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Car Size</label>
        <input
          type="text"
          value={CarSize}
          onChange={(e) => setCarSize(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Driver Name</label>
        <input
          type="text"
          value={DriverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">Phone Number</label>
        <input
          type="text"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register Car
        </button>

        <Link to="/car">
          <button
            type="button"
            className="w-full mt-4 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
          >
            Back to Car List
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Addnewcar;
