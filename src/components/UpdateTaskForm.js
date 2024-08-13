import React, { useState, useEffect } from 'react';
import { Grid, MenuItem, TextField, Button, Paper, Autocomplete } from '@mui/material';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import axios from 'axios'; //  use Axios for HTTP requests
// Sample data for projects and tasks
const projects = [
  { id: 1, name: 'Project Alpha' },
  { id: 2, name: 'Project Beta' },
  { id: 3, name: 'Project Gamma' }
];

const tasksData = {
  1: [
    { id: 101, title: 'Task 1', description: 'Description of Task 1' },
    { id: 102, title: 'Task 2', description: 'Description of Task 2' }
  ],
  2: [
    { id: 201, title: 'Task 3', description: 'Description of Task 3' },
    { id: 202, title: 'Task 4', description: 'Description of Task 4' }
  ],
  3: [
    { id: 301, title: 'Task 5', description: 'Description of Task 5' },
    { id: 302, title: 'Task 6', description: 'Description of Task 6' }
  ]
};

const UpdateTaskForm = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
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
 
  useEffect(() => {
    if (selectedProject) {
      // Load tasks related to selected project
      setTasks(tasksData[selectedProject] || []);
      setSelectedTask(''); // Reset selected task when project changes
      // setFormData({ title: '', description: '' }); // Clear form
    }
  }, [selectedProject]);

  // useEffect(() => {
  //   if (selectedTask) {
  //     const task = tasks.find((t) => t.id === selectedTask);
  //     setFormData({
  //       title: task.title,
  //       description: task.description
  //     });
  //   } else {
  //       setFormData({ title: '', description: '' });
  //   }
  // }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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

  const handleTaskUpdate = (e) => {
    e.preventDefault();
    console.log('Task Updated:', formData);
    // Perform the task update logic here (e.g., send a POST or PUT request)
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Left Side: Project List with Search */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h3>Select Project & Task</h3>
          <TextField
            select
            label="Select Project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Task"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            fullWidth
            disabled={!selectedProject}
            required
          >
            {tasks.map((task) => (
              <MenuItem key={task.id} value={task.id}>
                {task.title}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </Grid>

      {/* Right side: Task Update Form */}
     
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
              // onChange={handleIdChange}
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

export default UpdateTaskForm;
