import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid, Paper, TextField } from '@mui/material';
import '../styles/SimpleStyle.css';
import { getTodayDate, getTommorowDate } from '../modules/FormData';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: ''+getTodayDate(),
    endDate: ''+getTommorowDate(),
    status: '',
    priority: ''
 
    // Add more fields as needed
  });

  const taskStatus = ["Initialize",
  "Working",
  "Completed","Review"];

  const taskPriority = ["High",
  "Medium",
  "Low"];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    axios.post('http://localhost:8080/admin/tasks', formData,{
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        'Content-Type': 'application/json'  
      }
    })
      .then(response => {
        console.log('User registered successfully:', response.data);
        // Optionally, redirect or show success message
      })
      .catch(error => {
        console.error('Error registering user:', error);
        // Handle error appropriately
      });
  };

  return (
   
<Paper elevation={3} sx={{ padding: 2, maxWidth: 500,marginLeft:5,
     marginBottom: 10,marginTop:2}}>

      <h2 className="my-4">Create New Task</h2>
      <form onSubmit={handleSubmit}>
     
      <Grid container spacing={2}>
             
             <Grid item xs={12}>
     
          <TextField
            className="txtField"
            label="Task Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
              <Grid item xs={12}>
          <TextField
            className="txtField"
            label="Task Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
      </Grid>
              <Grid item xs={12}>
          <TextField
            className="txtField"
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
      </Grid>
              <Grid item xs={12}>
          <TextField
            className="txtField"
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
        
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="txtSearch"
        name="status"
        value={formData.status}
        options={taskStatus}
        onChange={(event, newValue) => {
          setFormData(prevState => ({
            ...prevState,
            status: newValue
          }));
        }}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Task Status" />}
        />
          

        </Grid>
             
              <Grid item xs={12}>
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              className="txtSearch"
              name="priority"
              value={formData.priority}
              onChange={(event, newValue) => {
                setFormData(prevState => ({
                  ...prevState,
                  priority: newValue
                }));
              }}
              options={taskPriority}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Task priority" />}
              />
          
       </Grid>
              <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
           Add Task
          </Button>
          </Grid>
              </Grid >

       
      </form>

      </Paper>
    
  );
};

export default TaskForm;

