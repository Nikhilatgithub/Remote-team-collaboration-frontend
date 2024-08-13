import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Grid, Box } from '@mui/material';

const ProjectInfo = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  useEffect(() => {
    // Fetch project data when the component mounts
    const fetchProjectData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/project'); // Replace with your API endpoint
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
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
