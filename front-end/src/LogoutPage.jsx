import React from "react";
import { Link } from "react-router-dom";

const LogoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
        {/* Navigation Bar */}
            <div className="bg-green-700 h-20 flex justify-between items-center px-8 fixed top-0 w-full z-50">
              <h1 className="text-white text-3xl font-bold">St_Luke_Hospital</h1>
      
              {/* Navigation buttons on the right */}
              <div className="flex space-x-4">
                  <Link to="/">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Home
                  </button>
                </Link>
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

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen bg-blue-700 text-white">
        <h1 className="text-5xl font-semibold">You are logged out</h1>
      </main>

       {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
        <p>© 2025 St_Luke_Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LogoutPage;
