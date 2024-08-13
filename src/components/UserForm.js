import React, { useEffect, useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Paper, TextField, Button, Grid, Autocomplete } from '@mui/material';
import '../styles/SimpleStyle.css';
import { createUser, fetchTeams, setAuthToken } from '../services/AdminService';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    status: '',
    jobTitle: '',
    roleId: '',
    teamId: ''
    // Add more fields as needed
  });

  const [teamData, setTeamData] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setAuthToken(token);
    try {
      const response = await createUser(formData);
      console.log('User created successfully:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error creating User:', error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    setAuthToken(token); // Set the auth token before making requests

    const loadTeams = async () => {
      try {
        const teams = await fetchTeams();
        setTeamData(teams.map(team => `${team.id} ${team.name}`));
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadTeams();
  }, [token]);


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
        id="combo-box-status"
        className="txtSearch"
        onChange={(event, newValue) => {
          setFormData(prevState => ({
            ...prevState,
            status: newValue
          }));
        }}
        options={userStatus}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="User Status" />}
        />
          

        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete
        disablePortal
        id="combo-box-jobTitle"
        className="txtSearch"
        onChange={(event, newValue) => {
          setFormData(prevState => ({
            ...prevState,
            jobTitle: newValue
          }));
        }}
        options={jobTitile}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="User Job Title" />}
        />

             </Grid>

              <Grid item xs={12} sm={6}>
      
      <Autocomplete
          disablePortal
          id="combo-box-teamId"
          onChange={(event, newValue) => {
            try{
              const numberStr = newValue.split(' ')[0];
              const number = parseInt(numberStr, 10);
              setFormData(prevState => ({
                ...prevState,
                teamId: number
              }));
            }
            catch(error)
            {

            }
            
          }}
          options={teamData}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Assign Team To User" />}
          />
   
     </Grid>
     <Grid item xs={12} sm={6}>
      
      <Autocomplete
          disablePortal
          id="combo-box-roleId"
          onChange={(event, newValue) => {
            let id = 3;
            if(newValue==="ADMIN")
             id=1;
            else if(newValue==="MANAGER")
             id=2;
            setFormData(prevState => ({
              ...prevState,
              roleId: id
            }));
          }}
          required
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

