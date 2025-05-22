import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Payment() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user session
  const navigate = useNavigate();

  // Check user session on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/payment');
      return;
    }

    axios.get('http://localhost:8000/payment', { withCredentials: true })
      .then((response) => {
        setData(response.data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate('/payment');
      });
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div>
        <h2 className="text-2xl font-bold mb-5">Payment List</h2>
        <Link to="/addpayment">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-221 w-40 mb-5">
            Add Payment
          </button>
        </Link>
      </div>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">PaymentNumber</th>
            <th className="px-4 py-2 border">AmountPaid</th>
            <th className="px-4 py-2 border">PaymentDate</th>
            <th className="px-4 py-2 border">RecordNumber</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{i + 1}</td>
              <td className="px-4 py-2 border">{val.AmountPaid}</td>
              <td className="px-4 py-2 border">{val.PaymentDate}</td>
              <td className="px-4 py-2 border">{val.RecordNumber}</td>
              <td className="px-4 py-2 border"><button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 mr-2">Update</button>
              <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-300">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
