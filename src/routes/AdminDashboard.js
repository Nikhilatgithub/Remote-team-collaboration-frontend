// components/AdminRoutes.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/DashBoard';
import ProjectForm from '../components/ProjectForm';
import UpdateProjectForm from '../components/UpdateProjectForm';
import UserForm from '../components/UserForm';
import TaskForm from '../components/TaskForm';
import UpdateTaskForm from '../components/UpdateTaskForm';
import TeamForm from '../components/TeamForm';
import TeamMembers from '../components/TeamMembers';
import UpdateUserForm from '../components/UpdateUserForm';
import EmployeeProfile from '../components/EmployeeProfile';
import ChatPage from '../components/ChatPage';

const AdminDashboard = () => {
    return (
      
        
        <Routes> 
        <Route path="/create-project" element={<ProjectForm />} />
        <Route path="/update-project" element={<UpdateProjectForm />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/manage-task" element={<UpdateTaskForm />} />
        <Route path="/add-team" element={<TeamForm />} />
        <Route path="/manage-team" element={<TeamMembers />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/update-user" element={<UpdateUserForm />} />
        <Route path="/update-profile" element={<EmployeeProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Add more admin-specific routes as needed */}
    </Routes>

       
    );
};

export default AdminDashboard;
