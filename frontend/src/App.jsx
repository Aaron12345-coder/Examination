import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Display from './Display';
import Login from './pages/Login';
import Register from './pages/Register';
// import Updateusers from './Updateusers';
import Navbar from './components/Navbar';
import DashboardLayout from './DashboardLayout';
import LogoutPage from './pages/LogoutPage';
import Dashboard from './pages/Dashboard';
import TableInput from './components/TableInput';
import Reports from './pages/Reports';
import Car from './pages/Car';
import Addnewcar from './pages/Addnewcar';
import Services from './pages/Services';
import AddService from './pages/AddService';
import ServicePackage from './pages/ServicePackage';
import AddServiceRecord from './pages/Addservicerecord';
import Payment from './pages/Payment';
import Addpayment from './pages/Addpayment';
import Update from './pages/Update';
import Packages from './pages/Packages';
import Updatecar from './pages/Updatecar';
import Updateservices from './pages/Updateservices';
import Revision from './pages/Revision';
import Adduser from './pages/Adduser';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path='/logout' element={<LogoutPage/>}></Route>
        {/* Protected routes inside the Dashboard layout */}
        <Route path='/' element={<DashboardLayout />}>
        <Route path='/tableinput' element={<TableInput/>}></Route>
        <Route path='/reports' element={<Reports/>}></Route>
        <Route path='/car' element={<Car/>}></Route>
        <Route path='/addnewcar' element={<Addnewcar/>}></Route>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/addservice' element={<AddService/>}></Route>
        <Route path='/servicepackage' element={<ServicePackage/>}></Route>
        <Route path='/addservicerecord' element={<AddServiceRecord/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/addpayment' element={<Addpayment/>}></Route>
        <Route path='/Update/:RecordNumber_id' element={<Update/>}></Route>
        <Route path='/packages' element={<Packages/>}></Route>
        <Route path='/updatecar/:PlateNumber_id' element={<Updatecar/>}></Route>
        <Route path='/updateservice/:id' element={<Updateservices/>}></Route>
        <Route path='/revision' element={<Revision/>}></Route>
        <Route path='/adduser' element={<Adduser/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/display" element={<Display />} />
          {/* <Route path="/updateusers/:id" element={<Updateusers />} /> */}
          {/* Add more protected routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
