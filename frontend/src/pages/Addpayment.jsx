import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addpayment() {
  const [form, setForm] = useState({
    AmountPaid: '',
    PaymentDate: '',
    RecordNumber: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/payment', form);
      alert('Payment added successfully!');
      navigate('/payment'); // Navigate back to the payment list page
    } catch (err) {
      console.error('Error adding payment:', err);
      alert('There was an error adding the payment!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount Paid</label>
          <input
            type="number"
            name="AmountPaid"
            value={form.AmountPaid}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Date</label>
          <input
            type="date"
            name="PaymentDate"
            value={form.PaymentDate}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Record Number</label>
          <input
            type="number"
            name="RecordNumber"
            value={form.RecordNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Payment
        </button>
      </form>
    </div>
  );
}

export default Addpayment;
