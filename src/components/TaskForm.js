import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Button, Grid, Paper, TextField, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/SimpleStyle.css';
import { getTodayDate, getTommorowDate } from '../modules/FormData';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '' + getTodayDate(),
    endDate: '' + getTommorowDate(),
    status: '',
    priority: ''
  });
  const [userList, setUserList] = useState([
    "Paris", "London", "New York", "Tokyo", "Berlin",
    "Buenos Aires", "Cairo", "Canberra", "Rio de Janeiro", "Dublin"
  ]);
  const taskStatus = ["Initialize", "Working", "Completed", "Review"];
  const taskPriority = ["High", "Medium", "Low"];
  const [projects, setProjects] = useState([
    'Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIdChange = (event, value) => {
    const data=String(value).split(" ");
     setFormData(prevState => ({
       ...prevState,
      name: ''+data[1],
     description: 'hi this is demo',
     startDate: ''+getTodayDate(),
     endDate: ''+getTommorowDate(),
     }));
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    axios.post('http://localhost:8080/admin/tasks', formData, {
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

  const filteredProjects = projects.filter(project =>
    project.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filteredProjects.map((project, index) => (
              <ListItem button key={index}>
                <ListItemText primary={project} />
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
                  name="endDate"
                  value={formData.endDate}
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
