
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import AdminRoutes from './routes/AdminRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import { useState } from 'react';
import Dashboard from './components/DashBoard';
import Recovery from './components/ForgotPassword';


function App() {
 // const [userRole,setUserRole] = useState("manager");
 //const [userRole, setUserRole] = useState(localStorage.getItem('userRole')?.toLowerCase() || '');
 const userRole=localStorage.getItem('userRole')?.toLowerCase() || '';
   //setUserRole(String(localStorage.getItem('userRole')).toLowerCase());
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //   <ProjectForm />
    //   </header> */}
    //   <UserForm />
    // </div>
    <Router className="bg-component">
     
    <Routes>
      
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/forgot" element={<Recovery />} />
      {/* <Route path="/" element={<Dashboard />} /> */}

      {userRole === '' && <Route path="/*" element={<Navigate to="/login" />} />}
        {userRole === 'admin' && <Route path="/*" element={<AdminRoutes />} />}
        {userRole === 'manager' && <Route path="/*" element={<ManagerRoutes />} />}
        {userRole === 'employee' && <Route path="/*" element={<ManagerRoutes />} />}
      {/* <Route path="/admin" element={<AdminRoutes />} />
      <Route path="/manager" element={<ManagerRoutes />} /> */}
      {/* {userRole === '' && <Route path="/admin" element={<AdminRoutes />} />}
      {userRole === 'admin' && <Route path="/*" element={<AdminRoutes />} />}
      {userRole === 'manager' && <Route path="/manager" element={<ManagerRoutes />} />} */}
      {/* <Route path="/admin" element={<Dashboard />} /> */}
    </Routes>
  </Router>
    
  );
}

export default App;
