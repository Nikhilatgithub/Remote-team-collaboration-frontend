import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid, Paper, TextField } from '@mui/material';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import '../styles/SimpleStyle.css';
const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: ''+getTodayDate(),
    endDate: ''+getTommorowDate(),
 
    // Add more fields as needed
  });
  const [teamData, setTeamData] = useState(["012 Alpha",
  "12 Delta",
  "983 Gamma"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', formData)
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

      <h2 className="my-4">Start New Project</h2>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
             
             <Grid item xs={12}>
     
          <TextField
            className="txtField"
            label="Project Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        
        </Grid>
              <Grid item xs={12}>
        
          <TextField
            className="txtField"
            label="Project Description"
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
             
              options={teamData}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Assign Team To Project" />}
              />
       
         </Grid>
         <Grid item xs={12}>
        
          <Button type="submit" variant="contained" color="primary">
           Create Project
          </Button>
        </Grid>
        </Grid>
        
       
      </form>

      </Paper>
   
  );
};

export default ProjectForm;

