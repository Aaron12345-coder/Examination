import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Display from './Display';
import Login from './Login';
import Register from './Register';
import Updateusers from './Updateusers';
import Addnew from './Addnew';
import Nav from './Nav';
import DashboardLayout from './Dashboardlayout';
import LogoutPage from './LogoutPage';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Nav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path='/logout' element={<LogoutPage/>}></Route>
        {/* Protected routes inside the Dashboard layout */}
        <Route path='/' element={<DashboardLayout />}>
         <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/display" element={<Display />} />
          <Route path="/addnew" element={<Addnew />} />
          <Route path="/updateusers/:id" element={<Updateusers />} />
          {/* Add more protected routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
