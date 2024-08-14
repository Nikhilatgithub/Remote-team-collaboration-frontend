import React, { useEffect, useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid, Paper, TextField, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/SimpleStyle.css';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import { createTask, fetchProject, fetchTeams, fetchUsers, setAuthToken } from '../services/AdminService';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '' + getTodayDate(),
    dueDate: '' + getTommorowDate(),
    status: '',
    priority: '',
    assignedToUserId: '',
    projectId: ''
  });
  const [userList, setUserList] = useState([]);
  const taskStatus = ["Initialize", "Working", "Completed", "Review"];
  const taskPriority = ["High", "Medium", "Low"];

  const [searchQuery, setSearchQuery] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [projectData, setProjectData] = useState([]);

  
  let teamId=0;
  
  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIdChange = (event, value) => {
    try{
      const data=String(value).split(" ");
      const number = parseInt(data[0], 10);
      setFormData(prevState => ({
        ...prevState,
        assignedToUserId: number,
      }));
    }
    catch(error)
    {}
   
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await createTask(formData);
      console.log('task created successfully:', response);
      
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error updating User:', error);
      // Handle error appropriately
    }
  };

  const filteredProjects = projectData.filter(project =>
    project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadUsers = async (projectListname) => {
    try {
      const numberStr = projectListname.split(' ')[0];
      const number = parseInt(numberStr, 10);
      projectList.forEach(project => {if(project.id===number){teamId=project.teamId}});
      setAuthToken(token);
      console.log(teamId);
      const users = await fetchUsers();
      setFormData(prevState => ({
        ...prevState,
        projectId: number,
      }));
      setUserList(
        users
          .filter(user => user.teamId === teamId) // Filter users by teamId
          .map(user => `${user.id} ${user.firstname} ${user.lastname}`) // Map the filtered users to the desired string format
      );
      
      // setUserList(users.map(user =>{if(user.teamId===teamId){ `${user.id} ${user.firstname} ${user.lastname}`}}));
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  useEffect(() => {
    setAuthToken(token); // Set the auth token before making requests
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

   // loadUsers();
    loadProjects();
  }, [token]);



  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Left Side: Project List with Search */}
      <Grid item xs={12} md={4}>
        {/* <Paper elevation={3} sx={{  marginBottom: 2 }}>
        
          
        </Paper> */}

        <Paper elevation={3} sx={{marginTop:7, padding: 2, maxHeight: 600, overflow: 'auto' }}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List>
            {filteredProjects.map((projectList, index) => (
              <ListItem button key={index} onClick={() => loadUsers(projectList)}>
                <ListItemText primary={projectList} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Right Side: Task Form */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
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
                  fullWidth
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
                  fullWidth
                />
              </Grid>

            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                className="txtSearch"
                options={userList}
                sx={{ width: '100%' }}
              onChange={handleIdChange}
                renderInput={(params) => <TextField {...params} label="Assign To User" />}
            />
            </Grid>
              <Grid item xs={6}>
                <TextField
                  className="txtField"
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="txtField"
                  label="End Date"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  className="txtSearch"
                  options={taskStatus}
                  value={formData.status}
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
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  className="txtSearch"
                  options={taskPriority}
                  value={formData.priority}
                  onChange={(event, newValue) => {
                    setFormData(prevState => ({
                      ...prevState,
                      priority: newValue
                    }));
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Task Priority" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
