import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddServiceRecord() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ServiceDate: '',
        PackageNumber: '',
        PlateNumber: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/records', form);
            alert('New service record added!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Service Record</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Service Date</label>
                    <input
                        type="date"
                        value={form.ServiceDate}
                        onChange={(e) => setForm({ ...form, ServiceDate: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Package Number</label>
                    <input
                        type="number"
                        value={form.PackageNumber}
                        onChange={(e) => setForm({ ...form, PackageNumber: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Plate Number</label>
                    <input
                        type="text"
                        value={form.PlateNumber}
                        onChange={(e) => setForm({ ...form, PlateNumber: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit Service Record
                </button>
            </form>
        </div>
    );
}

export default AddServiceRecord;
