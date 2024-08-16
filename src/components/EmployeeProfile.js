import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box, Avatar, Autocomplete } from '@mui/material';
import { getEmployee, setAuthToken, updateProfile, updateUserStatus } from '../services/EmployeeService';


const EmployeeProfile = () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
   
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const userStatus = ["Available",
  "Away",
  "Do not Disturb","Busy","On Leave"];
  const [statusName, setStatusName] = useState('');

  

  const handleStatusChange = async () => {
   
    try {
        console.log(statusName);
        const teams = await updateUserStatus(statusName);
        
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
  };




  useEffect(() => {
    setAuthToken(token); // Set the auth token before making requests

    const loadUser = async () => {
      try {
        const teams = await getEmployee();
        setProfileData({
            firstname: teams.firstname,
            lastname: teams.lastname,
            email: teams.email,
          });
          setStatusName(teams.status);
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

   
    loadUser();
  }, [token]);


  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt={`${profileData.firstname} ${profileData.lastname}`}
              src={profileData.avatarUrl}
              sx={{ width: 150, height: 150, marginBottom: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              {profileData.firstname} {profileData.lastname}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {profileData.email}
            </Typography>

           
              <Box component="form" sx={{ mt: 3, width: '100%' }}>
                <Grid container spacing={2}>
                <Autocomplete
                disablePortal
                id="combo-box-status"
                className="txtSearch"
                onChange={(event, newValue) => {
                    setStatusName(newValue);
                   // handleStatusChange();
                  }}
                value={statusName}
                options={userStatus}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="User Status" />}
                />
                  <Grid item xs={12} display="flex" justifyContent="center">
                 
                    <Button onClick={handleStatusChange} variant="contained" color="primary">
                    Save
                    </Button>
                    
                    
                  </Grid>
                </Grid>
              </Box>
          
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfile;
