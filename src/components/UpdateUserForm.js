import React, { useEffect, useState } from 'react';
import axios from 'axios'; // use Axios for HTTP requests
import { Paper, TextField, Button, Grid, Autocomplete, List, ListItemAvatar, ListItemButton, ListItemText, Avatar, ListItem } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, fetchTeams, fetchUsers, setAuthToken, updateUsers } from '../services/AdminService';

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    status: '',
    jobTitle: '',
    roleId: '',
    teamId: ''
  });

  const [teamData, setTeamData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [userId, setUserId] = useState();
  const [selectedTeam, setTeam] = useState("");
  const [selectedRole, setRole] = useState("");

  const userStatus = ["Available", "Away", "Do not Disturb", "Busy", "On Leave"];
  const jobTitile = ["Project Manager", "Developer", "Tester", "Supporter"];
  const userRole = ["ADMIN", "MANAGER", "EMPLOYEE"];

  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const dataFiltered = filterData(searchQuery, userList);

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

      const response = await updateUsers(userId,formData);
      console.log('User updated successfully:', response);
      loadUsers();
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error updating User:', error);
      // Handle error appropriately
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await deleteUser(userId);
      console.log('User deleted successfully:', response);
      loadUsers();
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error deleting User:', error);
      // Handle error appropriately
    }
  };

  const loadUsers = async () => {
    try {
      const users = await fetchUsers();
      setUsersData(users);
      setUserList(users.map(user => `${user.id} ${user.firstname} ${user.lastname}`));
      setFormData( ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        status: '',
        jobTitle: '',
        roleId: '',
        teamId: ''
       }));
       setTeam("");
       setRole("");
    } catch (error) {
      console.error('Failed to load users:', error);
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

    loadUsers();
   
  }, [token]);


  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
    {/* User List on the Left Side */}
    <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ padding: 2, height: '100%', maxHeight: 600, overflow: 'auto' }}>
          <h2 className="my-4">User List</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
            {dataFiltered.map((value, index) => (
              <ListItem key={index} disablePadding onClick={()=>{try{
                console.log(value);
                const numberStr = value.split(' ')[0];
                const number = parseInt(numberStr, 10);
                
                 const user=usersData.find(proj => proj.id === number);
                 setUserId(number);
                 setFormData( ({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: '',
                  status: user.status,
                  jobTitle: user.jobTitle,
                  roleId: user.roleId,
                  teamId: user.teamId
                 }));
                setTeam(user.teamId+" "+user.teamName);
                console.log(user.roleName);
                setRole(user.roleName);
               
               
              }
              catch(error)
              {
            
              }}}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText primary={value} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

       {/* User Form on the Right Side */}
       <Grid item xs={12} sm={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h2 className="my-4">Manage Users</h2>
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  required
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  className="txtField"
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="user-status"
                  onChange={(event, newValue) => {
                    setFormData(prevState => ({
                      ...prevState,
                      status: newValue
                    }));
                  }}
                  value={formData.status}
                  options={userStatus}
                  renderInput={(params) => <TextField {...params} label="User Status" fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="user-job-title"
                  onChange={(event, newValue) => {
                    setFormData(prevState => ({
                      ...prevState,
                      jobTitle: newValue
                    }));
                  }}
                  value={formData.jobTitle}
                  options={jobTitile}
                  renderInput={(params) => <TextField {...params} label="User Job Title" fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="user-team"
                  value={selectedTeam}
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
                  renderInput={(params) => <TextField {...params} label="Assign Team To User" fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="user-role"
                  options={userRole}
                  onChange={(event, newValue) => {
                    try{
                      let id = 3;
                      if(newValue==="ADMIN")
                       id=1;
                      else if(newValue==="MANAGER")
                       id=2;
                      setFormData(prevState => ({
                        ...prevState,
                        roleId: id
                      }));
                    }
                    catch(error){}
              
                  }}
                  value={selectedRole}
                  renderInput={(params) => <TextField {...params} label="Assign Role To User" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
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

export default UpdateUserForm;
