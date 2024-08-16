import React, { useEffect, useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid,   Paper,  TextField } from '@mui/material';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import '../styles/SimpleStyle.css';
import { createProject, setAuthToken, fetchTeams } from '../services/AdminService';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: ''+getTodayDate(),
    endDate: ''+getTommorowDate(),
    status: '',
    teamId: null,
    teamName: '',
    TeamDescription: ''
    // Add more fields as needed
  });

  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const [teamData, setTeamData] = useState([]);
  const [teams, setTeams] = useState([]);
  const projectStatus = ["Initialize",
  "Designing",
  "Planning","Implementing","Testing","Deployment","Maintainance"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await createProject(formData);
      console.log('Project created successfully:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error appropriately
    }
  };

  // const fetchTeams = async () => {
  //   try {
  //       if (teamData.length === 0) {
  //     const response = await axios.get('http://localhost:8080/manager/teams',{
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
  //         'Content-Type': 'application/json'
         
  //       }
  //     });
  //     response.data.forEach(element => {
  //       console.log(element.id+" "+element.name);
  //       setTeamData(prevTeamData => [...prevTeamData, element.id+" "+element.name]);
  //     });
     
  //   }
    
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  useEffect(() => {
    setAuthToken(token); // Set the auth token before making requests

    const loadTeams = async () => {
      try {
        const teams = await fetchTeams();
        setTeams(teams);
        setTeamData(teams.map(team => `${team.id} ${team.name}`));
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadTeams();
  }, [token]);

  // useEffect(() => {
  //   if (teamData.length === 0) {
  //     fetchTeams();
  //   }
    
  // }, []);

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
              <Grid item xs={12} sm={6}>
     
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
              <Grid item xs={12} sm={6}>
        
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
        onChange={(event, newValue) => {
          setFormData(prevState => ({
            ...prevState,
            status: newValue
          }));
        }}
        options={projectStatus}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Project Status" />}
        />
          

        </Grid>
              <Grid item xs={12}>
      
          <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                try{
                  const numberStr = newValue.split(' ')[0];
                  const number = parseInt(numberStr, 10);
                  teams.find(team=> {if(team.id===number)
                  {setFormData(prevState => ({
                    ...prevState,
                    teamId: number,
                    teamName: team.teamName,
                    TeamDescription: team.TeamDescription
                  }));}
                  })
                  // setFormData(prevState => ({
                  //   ...prevState,
                  //   teamId: number,
                  // }));
                }
                catch(error)
                {

                }
                
              }}
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

