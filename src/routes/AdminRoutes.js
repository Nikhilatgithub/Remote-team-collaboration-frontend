// components/AdminRoutes.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/DashBoard';
import ProjectForm from '../components/ProjectForm';
import UpdateProjectForm from '../components/UpdateProjectForm';
import UserForm from '../components/UserForm';

const AdminRoutes = () => {
    return (
       <>
       <Dashboard />
        <Routes>
            <Route path="/create-project" />
            <Route path="/update-project"  />
            <Route path="/add-user"  />
            <Route path="/login"  />
            <Route path="/add-task" />
            <Route path="/manage-task"  />
            <Route path="/add-team" />
            <Route path="/manage-team"  />
            {/* <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/update-project" element={<UpdateProjectForm />} />
            <Route path="/add-user" element={<UserForm />} /> */}
            {/* Add more admin-specific routes as needed */}
        </Routes>
       </>
       
       
    );
};

export default AdminRoutes;
