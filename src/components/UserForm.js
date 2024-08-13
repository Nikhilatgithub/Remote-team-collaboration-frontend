import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Paper, TextField, Button, Grid, Autocomplete } from '@mui/material';
import '../styles/SimpleStyle.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
 
    // Add more fields as needed
  });

  const [teamData, setTeamData] = useState([]);

  const userStatus = ["Available",
  "Away",
  "Do not Disturb","Busy","On Leave"];

  const jobTitile = ["Project Manager",
  "Developer",
  "Tester","Supporter"];

  const userRole = ["ADMIN",
  "MANAGER",
  "EMPLOYEE"];


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

      <h2 className="my-4">User Registration</h2>
      <form onSubmit={handleSubmit}>

      <Grid container spacing={2}>
             
      <Grid item xs={12} sm={6}>
          <TextField
            className="txtField"
            label="First Name"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          </Grid>
      <Grid item xs={12} sm={6}>
          <TextField
            className="txtField"
            label="Last Name"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
       </Grid>
              <Grid item xs={12}>
          <TextField
            className="txtField"
            label="Email Id"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
              <Grid item xs={12}>
          <TextField
            className="txtField"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="txtSearch"
        options={userStatus}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="User Status" />}
        />
          

        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="txtSearch"
        options={jobTitile}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="User Job Title" />}
        />

             </Grid>

              <Grid item xs={12} sm={6}>
      
      <Autocomplete
          disablePortal
          id="combo-box-demo"
         
          options={teamData}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Assign Team To User" />}
          />
   
     </Grid>
     <Grid item xs={12} sm={6}>
      
      <Autocomplete
          disablePortal
          id="combo-box-demo"
         
          options={userRole}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Assign Role To User" />}
          />
   
     </Grid>

     <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
           Register
          </Button>
          </Grid>
        </Grid >
    
      </form>

      </Paper>
  
  );
};

export default UserForm;

