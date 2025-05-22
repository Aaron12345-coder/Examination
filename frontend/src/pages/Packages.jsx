import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Packages() {
    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const loadRecords = async () => {
        const res = await axios.get('http://localhost:8000/package');
        setRecords(res.data);
    };

    const handleDelete = async (PackageNumber) => {
        try {
            await axios.delete(`http://localhost:8000/Package/${PackageNumber}`);
            alert('Record deleted successfully!');
            loadRecords(); // Reload records after deletion
        } catch (err) {
            console.error(err);
            alert('Error deleting record');
        }
    }

    useEffect(() => {
        loadRecords();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Packages List</h2>

            <Link to="/addservicerecord">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ml-160 w-50"
                >
                    {showForm ? 'Cancel' : 'Add Packages'}
                </button>
            </Link>

            <div className="overflow-x-auto mt-6">
                <table className=" border border-gray-300 rounded-lg shadow-lg w-full">
                    <thead className="bg-gray-200 text-gray-800">
                        <tr>
                            <th className="px-4 py-2 border">PackageNumber</th>
                            <th className="px-4 py-2 border">PackageName</th>
                            <th className="px-4 py-2 border">PackageDescription</th>
                            <th className="px-4 py-2 border">PackagePrice</th>
                            <th className="px-4 py-2 border w-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((r) => (
                            <tr key={r.PackageNumber} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border text-center">{r.PackageNumber}</td>
                                <td className="px-4 py-2 border text-center">{r.PackageName}</td>
                                <td className="px-4 py-2 border text-center">{r.PackageDescription}</td>
                                <td className="px-4 py-2 border text-center">{r.PackagePrice}</td>
                                <td className="px-4 py-2 border text-center">
                                 <Link to={`/Update/${r.PackageNumber}`}>   <button
                                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 mr-2"
                                    >
                                        Update
                                    </button></Link>
                                    <button
                                        onClick={() => handleDelete(r.PackageNumber)}
                                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Packages;
