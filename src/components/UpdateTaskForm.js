import React, { useState, useEffect } from 'react';
import { Grid, MenuItem, TextField, Button, Paper, Autocomplete, List, ListItem, ListItemText } from '@mui/material';
import { getTodayDate, getTommorowDate } from '../modules/FormData';
import axios from 'axios'; //  use Axios for HTTP requests
import { deleteTask, fetchProject, fetchTask, fetchUsers, setAuthToken, updateTask } from '../services/AdminService';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateTaskForm = () => {
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
  const [projectList, setProjectList] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const taskStatus = ["Initialize", "Working", "Completed", "Review"];
  const taskPriority = ["High", "Medium", "Low"];

  let teamId = 0;
  var taskId = 0;
  
  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIdChange = (event, value) => {
    try {
      const data = String(value).split(" ");
      const number = parseInt(data[0], 10);
      setFormData(prevState => ({
        ...prevState,
        assignedToUserId: number,
      }));
    } catch (error) {}
  };

  const loadUsers = async (projectListname) => {
    try {
      const numberStr = String(projectListname).split(' ')[0];
      const number = parseInt(numberStr, 10);
      projectList.forEach(project => { if (project.id === number) { teamId = project.teamId } });
      setAuthToken(token);
      const users = await fetchUsers();
      setFormData(prevState => ({
        ...prevState,
        projectId: number,
      }));
      setUserList(
        users
          .filter(user => user.teamId === teamId) // Filter users by teamId
         // .map(user => `${user.id} ${user.firstname} ${user.lastname}`) // Map the filtered users to the desired string format
         .map(user => `${user.id} ${user.firstname} ${user.lastname}`)
      );
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadTasks = async (projectListname) => {
    try {
      const numberStr = String(projectListname).split(' ')[0];
      const number = parseInt(numberStr, 10);
      projectList.forEach(project => { if (project.id === number) { teamId = project.teamId } });
      setAuthToken(token);
      const tasks = await fetchTask();
      setFormData(prevState => ({
        ...prevState,
        projectId: number,
      }));
      console.log(tasks);
      setTaskList(
        tasks
          .filter(user => user.projectId === number) // Filter users by teamId
          .map(user => user) // Map the filtered users to the desired string format
      );
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
        setProjectData(projects.map(project => `${project.id} ${project.name}`));
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadProjects();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedTask.id);
      const projects = await updateTask(selectedTask.id,formData);
    
    } catch (error) {
      console.error('Failed to load teams:', error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const projects = await deleteTask(selectedTask.id);
    
    } catch (error) {
      console.error('Failed to load teams:', error);
    }
  };


  const handleTaskClick = (task) => {
    setSelectedTask(task);
    taskId=task.id;
    
    setFormData({
      title: task.title,
      description: task.description,
      startDate: task.startDate || getTodayDate(),
      dueDate: task.dueDate || getTommorowDate(),
      status: task.status || '',
      priority: task.priority || '',
      assignedToUserId: task.assignedToUserId || '',
      projectId: task.projectId || ''
    });
    userList.forEach(name=>{ const [userId, ...restOfName] = name.split(' '); // Split the name to get the userId part
    const number = parseInt(userId, 10);
   //console.log(number,task.assignedToUserId);
    if (number===task.assignedToUserId) {
        setSelectedUser(name);
    }
    })
   
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Left Side: Project List with Tasks */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h3>Select Project & Task</h3>
          <TextField
            select
            label="Select Project"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
            onChange={(e) => {loadUsers(e.target.value); loadTasks(e.target.value)}}
          >
            {projectList.map((project) => (
              <MenuItem key={project.id} value={project.id}>
               {project.id} {project.name}
              </MenuItem>
            ))}
          </TextField>

          {/* List of Tasks */}
          <List>
            {taskList.map((task) => (
              <ListItem button key={task.id} onClick={() => handleTaskClick(task)}>
                <ListItemText primary={task.id+" "+task.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Right side: Task Update Form */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h2>Create or Update Task</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
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
                  value={selectedUser}
                  renderInput={(params) => <TextField {...params} label="Assign To User" />}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                <Button type="submit" variant="contained" color="primary" >
                  Save Task
                </Button>
                <Button onClick={handleDelete} sx={{ marginLeft: '10px' }} color="error"  variant="contained" startIcon={<DeleteIcon />}>
                  Delete
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
