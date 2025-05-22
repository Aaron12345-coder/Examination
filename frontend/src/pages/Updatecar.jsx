import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Updatecar() {
  const [CarType, setCarType] = useState('');
  const [CarSize, setCarSize] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { PlateNumber_id } = useParams();


  useEffect(() => {
    axios.get(`http://localhost:8000/updatecar/${PlateNumber_id}`)
      .then((res) => {
        setCarType(res.data.CarType);
        setCarSize(res.data.CarSize);
        setDriverName(res.data.DriverName);
        setPhoneNumber(res.data.PhoneNumber);
      })
      .catch((err) => {
        setError("Error fetching service record.");
        console.error("Error fetching service record:", err);
      });
  }, [PlateNumber_id]);

  const updatecar = (e) => {
    e.preventDefault();

    // Basic validation to ensure no fields are empty
    if (!CarType || !CarSize || !DriverName || !PhoneNumber) {
      setError("All fields are required!");
      return;
    }

    // Clear any previous error messages
    setError('');

    axios.put(`http://localhost:8000/updatecar/${PlateNumber_id}`, {
      CarType: CarType,
      CarSize: CarSize,
      DriverName: DriverName,
      PhoneNumber: PhoneNumber,
    })
      .then(() => {
        navigate('/car')
        alert("Service record updated successfully!");
      })
      .catch((err) => {
        setError("Error updating service record.");
        console.error("Update error:", err);
      });
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow-md">
      <form onSubmit={updatecar}>
        <h2 className="text-2xl font-bold mb-4 text-center">Update Car</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
          Update Car
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

export default Updatecar;
