import React, { useEffect, useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid, InputLabel, Paper, TextField } from '@mui/material';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/SimpleStyle.css'
import { createProject, deleteProject, fetchProject, fetchTeams, setAuthToken, updateProject } from '../services/AdminService';
import { Label } from '@mui/icons-material';
const UpdateProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: ''+getTodayDate(),
    endDate: ''+getTommorowDate(),
    status: '',
    teamId: null
    // Add more fields as needed
  });
  const [teamData, setTeamData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [projectId, setProjectId] = useState();
  const [selectedTeam, setTeam] = useState("");
  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
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

  const handleIdChange = (event, value) => { //project selected then do this
  try{
    const numberStr = value.split(' ')[0];
    const number = parseInt(numberStr, 10);
    setProjectId(number);
     const project=projectList.find(proj => proj.id === number);
     setFormData( ({
      
      name: project.name,
     description: project.description ,
     startDate: project.startDate,
     endDate: project.endDate,
     status: project.status,
     teamId: project.teamId
     }));
    setTeam(project.teamId+" "+project.teamName);
  }
  catch(error)
  {

  }
   

  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await updateProject(formData,projectId);
      console.log('Project updated successfully:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error updating project:', error);
      // Handle error appropriately
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await deleteProject(projectId);
      console.log('Project deleted successfully:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error deleting project:', error);
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

    const loadProjects = async () => {
      try {
        const projects = await fetchProject();
        setProjectList(projects);
        console.log(projects);
        setProjectData(projects.map(project => `${project.id} ${project.name}`));
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadTeams();
    loadProjects();
  }, [token]);

  return (
    
<Paper elevation={3} sx={{ padding: 2, maxWidth: 500,marginLeft:5,
     marginBottom: 10,marginTop:2}}>
      

      <h2 className="my-4">Manage Project</h2>
      <form onSubmit={handleSubmit}>
      
      <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="txtSearch"
            options={projectData}
            sx={{ width: '100%' }}
           onChange={handleIdChange}
            renderInput={(params) => <TextField {...params} label="Project Id/Name" />}
            />
        </Grid>
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
       <InputLabel >Start Date</InputLabel>
          <TextField
            className="txtField"
          
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
       </Grid>
       <Grid item xs={12} sm={6}>
        <InputLabel >End Date</InputLabel>
          <TextField
            className="txtField"
           
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
        value={formData.status}
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
                setFormData(prevState => ({
                  ...prevState,
                  teamId: number
                }));
              }
              catch(error)
              {}
              }}
              value={selectedTeam}
              options={teamData}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Assign Team To Project" />}
              />
         </Grid>
         <Grid item xs={12} sx={4}>
          <Button type="submit" variant="contained" color="primary">
           Save Project
          </Button>
          <Button onClick={handleDelete} sx={{ marginLeft: '10px' }} color="error"  variant="contained" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          </Grid>
          </Grid>


        
       
      </form>

      </Paper>
   
  );
};

export default UpdateProjectForm;

