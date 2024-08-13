// components/AdminRoutes.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/DashBoard';
;

const ManagerRoutes = () => {
    return (
       <>
       <Dashboard />
        <Routes>
            {/* <Route path="/create-project" />
            <Route path="/update-project"  />
            <Route path="/add-task" />
            <Route path="/manage-task"  />
            <Route path="/add-team" />
            <Route path="/manage-team"  /> */}
            
        </Routes>
       </>
       
       
    );
};

export default ManagerRoutes;
