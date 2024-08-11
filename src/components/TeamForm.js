import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Button, Grid, Paper, TextField } from '@mui/material';
import '../styles/SimpleStyle.css';
const TeamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
    
 
    // Add more fields as needed
  });

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
    axios.post('http://localhost:8080/manager/teams', formData,{
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

      <h2 className="my-4">Create New Team</h2>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
             
             <Grid item xs={12}>
          <TextField
            className="txtField"
            label="Team Name"
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
            label="Team Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
         </Grid>
              <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
           Create Team
          </Button>
          </Grid>

              </Grid>

       
      </form>

      </Paper>
    
  );
};

export default TeamForm;

