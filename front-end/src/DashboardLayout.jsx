// components/DashboardLayout.jsx
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout', { withCredentials: true });
      sessionStorage.removeItem('user');
      window.location.reload()
        setIsLoggedIn(false);
        navigate('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    // Check if the user is logged in
    const user = sessionStorage.getItem('user');
    
    if (!user) {
      // If no user, redirect to the login page
      navigate('/logout');
    }
  }, [navigate]);



  return (
    <>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-50 bg-gray-800 text-white flex flex-col p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <div className="bg-green-700 h-20 flex justify-between items-center px-8 fixed top-0 w-300 z-50 ml-46">
            <h1 className="text-white text-3xl font-bold">St_Luke_Hospital</h1>
            </div>
        <Link to="/dashboard" className="hover:text-blue-400">📋 Dashboard</Link>
        <Link to="/display" className="hover:text-blue-400">📋 Display Users</Link>
        <Link to="/addnew" className="hover:text-blue-400">➕ Add User</Link>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 px-3 py-1 rounded hover:bg-red-600 mb-13"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
     <div className="dashboard-layout">
      {/* Your Sidebar or Navigation Menu */}
      <nav>
        {/* Sidebar links */}
      </nav>

      {/* Main content */}
      <main>
        {children}
      </main>
        {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
        <p>© 2025 St_Luke_Hospital. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}

export default DashboardLayout;
