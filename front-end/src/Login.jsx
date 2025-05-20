import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/login',{ username, password },
        { loggedin: true }
      );

      if (response.data.loggedin==true) {
        navigate('/display');
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Incorrect Username and Password. You are no allowed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <div className="p-3 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
           <p className="mt-4 text-center text-sm">
          Don't  have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Create Account
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
