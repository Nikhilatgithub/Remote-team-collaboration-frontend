// components/AdminRoutes.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyTeam from '../components/MyTeam';
import ProjectInfo from '../components/ProjectInfo';
import TaskBoard from '../components/TaskBoard';

const EmployeeDashboard = () => {
    return (
        <Routes> 
       
        <Route path="/view-myteam" element={<MyTeam />} />
        <Route path="/view-myproject" element={<ProjectInfo />} />
        <Route path="/view-mytasks" element={<TaskBoard />} />
        {/* Add more admin-specific routes as needed */}
    </Routes>
       
       
    );
};

export default EmployeeDashboard;
