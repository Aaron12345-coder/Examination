import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import icons
import { 
  FaTachometerAlt, 
  FaCar, 
  FaBox, 
  FaTools, 
  FaMoneyBill, 
  FaChartBar, 
  FaUserPlus, 
  FaSignOutAlt 
} from 'react-icons/fa';

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout', { withCredentials: true });
      sessionStorage.removeItem('user');
      window.location.reload();
      navigate('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/logout');
    }
  }, [navigate]);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-60 bg-gray-800 text-white flex flex-col p-4 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Car Service App</h2>

          {/* App Title Bar */}
          <div className="bg-green-700 h-20 flex justify-between items-center px-8 fixed top-0 w-full ml-56 z-50">
            <h1 className="text-white text-2xl font-bold truncate">
              Smart_Park_Company Car Washing Sales Management System (CWSMS)
            </h1>
          </div>

          {/* Navigation Links with Icons */}
          <div className="mt-2"> {/* Adjust margin to ensure space for the title bar */}
            <Link to="/dashboard" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaTachometerAlt /> Dashboard
            </Link>
            <Link to="/car" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaCar /> Car
            </Link>
              <Link to="/services" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaCar /> Services
            </Link>
                   <Link to="/packages" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaBox /> Packages
            </Link>
            <Link to="/servicepackage" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaTools /> Service Package
            </Link>
            <Link to="/payment" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaMoneyBill /> Payment
            </Link>
            <Link to="/reports" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaChartBar /> Reports
            </Link>
            <Link to="/tableinput" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaUserPlus /> Table Input
            </Link>

             <Link to="/revision" className="hover:text-blue-400 flex items-center gap-2 mt-5">
              <FaUserPlus /> Revision
            </Link>
          </div>

          {/* Logout Button */}
          <div className="mt-6 pt-6 border-t border-gray-600 mb-20">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded flex items-center justify-center gap-2 transition duration-200"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto mt-20">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
        <p>© Smart_Park_Company. All rights reserved.</p>
      </footer>
    </>
  );
}

export default DashboardLayout;
