import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
function TableInput({ onSubmit }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([{ service: '', carType: '', price: '' }]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    setRows([...rows, { service: '', carType: '', price: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend using axios
      const response = await axios.post('http://localhost:8000/api/data', rows).then(()=>{

         onSubmit(rows);
      navigate("/services")
      });
      
      // Call the onSubmit function (if needed for further handling)
     

      console.log('Data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='mt-50'>
    <form onSubmit={handleSubmit} className="space-y-4">
      <table className="table-auto w-full border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Service</th>
            <th className="p-2">Car Type</th>
            <th className="p-2">Price (Rwf)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="p-2">
                <input
                  type="text"
                  value={row.service}
                  onChange={(e) => handleChange(index, 'service', e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.carType}
                  onChange={(e) => handleChange(index, 'carType', e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={row.price}
                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2">
        <button type="button" onClick={addRow} className="bg-gray-500 text-white px-4 py-2 rounded">
          + Add Row
        </button>
           <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
}

export default TableInput;
