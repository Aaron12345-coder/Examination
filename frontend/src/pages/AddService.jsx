import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddService() {
  const [service, setService] = useState('');
  const [carType, setCarType] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !carType || !price) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/services', {
        service,
        carType,
        price,
      });

      navigate('/services'); // Redirect to service list
    } catch (err) {
      console.error(err);
      setError('Failed to add service. Try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Service</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Service Name</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Car Wash"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Car Type</label>
          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. SUV, Sedan"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (Rwf)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. 5000"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Service
          </button>

          <Link to="/services">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddService;
