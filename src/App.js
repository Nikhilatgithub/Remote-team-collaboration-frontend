
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import AdminRoutes from './routes/AdminRoutes';


function App() {
  const userRole = 'admin';
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
      {/* <Route path="/" element={<Dashboard />} /> */}
      {userRole === 'admin' && <Route path="/*" element={<AdminRoutes />} />}
      {/* <Route path="/admin" element={<Dashboard />} /> */}
    </Routes>
  </Router>
    
  );
}

export default App;
