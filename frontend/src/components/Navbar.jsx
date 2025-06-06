import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-green-700 h-20 flex justify-between items-center px-8 fixed top-0 w-full z-50">
        <h1 className="text-white text-3xl font-bold">Smart_Park_Company</h1>

        {/* Navigation buttons on the right */}
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Welcome Text in the Body */}
      <div className="flex items-center justify-center min-h-screen bg-blue-700 text-white">
        <h2 className="text-5xl font-semibold">Welcome to Our Site</h2>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
        <p>© 2025 Smart_Park_Company. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Navbar;
