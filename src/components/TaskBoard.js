import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, List, ListItem, MenuItem, Select, Box } from '@mui/material';
import { getAssignedTasks, setAuthToken, updateTaskStatus } from '../services/EmployeeService';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);


  
  // { id: 1, name: 'Design Homepage', description: 'Create the homepage design mockup', status: 'Assigned' },
  // { id: 2, name: 'Develop API', description: 'Build REST API for the project', status: 'Working' },
  // { id: 3, name: 'Write Tests', description: 'Write unit and integration tests', status: 'Completed' },
  // { id: 4, name: 'Review Code', description: 'Review the codebase for best practices', status: 'Review' },
  // { id: 5, name: 'Setup Database', description: 'Initialize the database schema', status: 'Assigned' },
  // { id: 6, name: 'Fix Bugs', description: 'Fix bugs identified in the testing phase', status: 'Working' },
  // { id: 7, name: 'Deploy to Production', description: 'Deploy the application to the production environment', status: 'Review' },
  // { id: 8, name: 'Update Documentation', description: 'Update the project documentation', status: 'Completed' },

  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const handleStatusChange = async (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    // Update the task in the state
    await updateTaskStatus(task.id,newStatus);
    loadTasks();
    // setTasks((prevTasks) =>
    //   prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    // );
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const loadTasks = async () => {
    try {
      const projects = await getAssignedTasks();
      setTasks(projects);
      console.log(projects);
      //setProjectData(projects.map(project => `${project.id} ${project.name}`));
    } catch (error) {
      console.error('Failed to load teams:', error);
    }
  };

  useEffect(() => {
    setAuthToken(token); // Set the auth token before making requests
    

   // loadUsers();
   loadTasks();
  }, [token]);


  const renderTaskList = (status) => (
    <List sx={{ padding: 2 }}>
      {filterTasksByStatus(status).map((task) => (
        <ListItem key={task.id} sx={{ mb: 2, padding: 0 }}>
          <Paper sx={{
            p: 2,
            width: '100%',
            border: '1px solid #dcdcdc', // Add border for Jira-like style
            borderRadius: 2, // Add slight rounding
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)', // Add shadow for depth
            ':hover': {
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Enhance shadow on hover
            },
          }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>{task.title}</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>{task.description}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption">Change Status:</Typography>
              <Select
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
                sx={{ ml: 2, minWidth: 120 }}
              >
                <MenuItem value="Initialize">Initialize</MenuItem>
                <MenuItem value="Working">Working</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              
              </Select>
            </Box>
          </Paper>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Grid container spacing={2} sx={{ height: '100vh', overflowX: 'auto' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ border: '1px solid #dcdcdc', borderRadius: 2, height: '100%' }}>
          <Typography variant="h5" sx={{ p: 2, borderBottom: '1px solid #dcdcdc', backgroundColor: '#f4f5f7', fontWeight: 'bold' }}>Assigned Tasks</Typography>
          {renderTaskList('Initialize')}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ border: '1px solid #dcdcdc', borderRadius: 2, height: '100%' }}>
          <Typography variant="h5" sx={{ p: 2, borderBottom: '1px solid #dcdcdc', backgroundColor: '#f4f5f7', fontWeight: 'bold' }}>Working</Typography>
          {renderTaskList('Working')}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ border: '1px solid #dcdcdc', borderRadius: 2, height: '100%' }}>
          <Typography variant="h5" sx={{ p: 2, borderBottom: '1px solid #dcdcdc', backgroundColor: '#f4f5f7', fontWeight: 'bold' }}>Completed</Typography>
          {renderTaskList('Completed')}
        </Paper>
      </Grid>
     
    </Grid>
  );
};

export default TaskBoard;
