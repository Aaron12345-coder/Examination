import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Update() {
  const { RecordNumber_id } = useParams();

  const [serviceDate, setServiceDate] = useState('');
  const [packageNumber, setPackageNumber] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/service-records/${RecordNumber_id}`)
      .then((res) => {
        setServiceDate(res.data.ServiceDate);
        setPackageNumber(res.data.PackageNumber);
        setPlateNumber(res.data.PlateNumber);
      })
      .catch((err) => {
        setErrorMessage("Error fetching service record.");
        console.error("Error fetching service record:", err);
      });
  }, [RecordNumber_id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Basic validation to ensure no fields are empty
    if (!serviceDate || !packageNumber || !plateNumber) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Clear any previous error messages
    setErrorMessage('');

    axios.put(`http://localhost:8000/Update/${RecordNumber_id}`, {
      ServiceDate: serviceDate,
      PackageNumber: packageNumber,
      PlateNumber: plateNumber,
    })
      .then(() => {
        alert("Service record updated successfully!");
      })
      .catch((err) => {
        setErrorMessage("Error updating service record.");
        console.error("Update error:", err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Service Record</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

        <div>
          <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700">Service Date</label>
          <input
            type="date"
            id="serviceDate"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="packageNumber" className="block text-sm font-medium text-gray-700">Package Number</label>
          <input
            type="text"
            id="packageNumber"
            value={packageNumber}
            onChange={(e) => setPackageNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700">Plate Number</label>
          <input
            type="text"
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <Link to="/servicepackage" className="text-sm text-blue-600 hover:underline">
            Back To List
          </Link>
        </div>

      </form>
    </div>
  );
}

export default Update;
