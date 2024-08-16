// components/AdminRoutes.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyTeam from '../components/MyTeam';
import ProjectInfo from '../components/ProjectInfo';
import TaskBoard from '../components/TaskBoard';
import EmployeeProfile from '../components/EmployeeProfile';
import ChatPage from '../components/ChatPage';

const EmployeeDashboard = () => {
    return (
        <Routes> 
       
        <Route path="/view-myteam" element={<MyTeam />} />
        <Route path="/view-myproject" element={<ProjectInfo />} />
        <Route path="/view-mytasks" element={<TaskBoard />} />
        <Route path="/update-profile" element={<EmployeeProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Add more admin-specific routes as needed */}
    </Routes>
       
       
    );
};

export default EmployeeDashboard;
