import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // To capture any errors
  const [loading, setLoading] = useState(false); // Loading state to show while the request is in progress
  const navigate = useNavigate(); // For redirecting after successful registration

  // Submit function to send the registration data to the backend
  const Submit = (e) => {
    e.preventDefault();

    // Basic validation before submitting
    if (!username || !password || !email ) {
      setError('All fields are required');
      return;
    }

    // Clear any previous error messages
    setError('');
    setLoading(true); // Show loading state while submitting

    // Make the POST request to the backend
    axios.post('http://localhost:8000/insert', {
      username,
      password,
      email
    })
      .then((response) => {
        // On success, redirect to the login page (or any page you want)
        setLoading(false);
        navigate('/'); // Assuming this goes to your login page
      })
      .catch((err) => {
        setLoading(false); // Hide loading state when there's an error
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error registering user. Please try again.');
        } else {
          setError('Error registering user. Please try again.');
        }
      });
  };

  return (
    <>
     <div className="bg-green-700 h-20 flex justify-between items-center px-8 fixed top-0 w-full z-50">
            <h1 className="text-white text-3xl font-bold">Smart_Park_Company</h1>
            </div>
             <div className="flex items-center justify-center  bg-blue-700 text-black h-183">
    <div className="max-w-sm mx-auto mt-10 p-4  border-gray-300 rounded  mt-15">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <form onSubmit={Submit}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {/* Show error message if any */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Input fields for registration */}
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mt-4">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          required
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          required
        />
          
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Sign Up...' : 'Sign Up'}
        </button>

        {/* Link to login page */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
      </div>
      
    </div>
       <footer className="bg-gray-800 text-white text-center py-3 fixed bottom-0 w-500">
        <p>© 2025 Smart_Park_Company. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}

export default Register;
