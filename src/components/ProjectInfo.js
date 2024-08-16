import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { getEmployeeProjects, setAuthToken } from '../services/EmployeeService';

const ProjectInfo = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: ''
  });
  const token = localStorage.getItem('token'); // Retr


  useEffect(() => {
    // Fetch project data when the component mounts


    const fetchProjects = async () => {
      try {
        setAuthToken(token)
        const project = await getEmployeeProjects();
        console.log(project);
        setProject( ({
          name: project.name,
         description: project.description ,
         startDate: project.startDate,
         endDate: project.endDate,
         status: project.status,
        // teamId: project.teamId
         }));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Project Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1">{project.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description:</Typography>
          <Typography variant="body1">{project.description}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Start Date:</Typography>
          <Typography variant="body1">{project.startDate}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">End Date:</Typography>
          <Typography variant="body1">{project.endDate}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Status:</Typography>
          <Typography variant="body1">{project.status}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectInfo;
