import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [combinedReport, setCombinedReport] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch combined vehicle & driver report
    axios.get('http://localhost:8000/care')
      .then(response => setCombinedReport(response.data))
      .catch(error => console.error("Error fetching combined report data", error));

    // Fetch payment records
    axios.get('http://localhost:8000/payments')
      .then(response => setPayments(response.data))
      .catch(error => console.error("Error fetching payment data", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8 flex flex-col items-center space-y-16">
      
      {/* Combined Vehicle + Driver Report */}
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center drop-shadow">
          Combined Daily Report
        </h1>
        <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700">
          <table className="min-w-full table-auto text-sm text-left text-gray-300 bg-gray-900">
            <thead className="bg-gray-800 text-blue-300">
              <tr>
                <th className="py-3 px-4">Plate Number</th>
                <th className="py-3 px-4">Car Type</th>
                <th className="py-3 px-4">Car Size</th>
                <th className="py-3 px-4">Driver Name</th>
                <th className="py-3 px-4">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {combinedReport.map(row => (
                <tr key={row.PlateNumber_id} className="hover:bg-gray-800 transition border-b border-gray-700">
                  <td className="py-3 px-4">{row.PlateNumber_id}</td>
                  <td className="py-3 px-4">{row.CarType}</td>
                  <td className="py-3 px-4">{row.CarSize}</td>
                  <td className="py-3 px-4">{row.DriverName}</td>
                  <td className="py-3 px-4">{row.PhoneNumber}</td>
                </tr>
              ))}
              {combinedReport.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Report */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center drop-shadow">
          Payment Report
        </h2>
        <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700">
          <table className="min-w-full table-auto text-sm text-left text-gray-300 bg-gray-900">
            <thead className="bg-gray-800 text-green-300">
              <tr>
                <th className="py-3 px-4">Payment Number</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Record Number</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.PaymentNumber} className="hover:bg-gray-800 transition border-b border-gray-700">
                  <td className="py-3 px-4">{p.PaymentNumber}</td>
                  <td className="py-3 px-4">{p.AmountPaid}</td>
                  <td className="py-3 px-4">{p.PaymentDate}</td>
                  <td className="py-3 px-4">{p.RecordNumber}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
