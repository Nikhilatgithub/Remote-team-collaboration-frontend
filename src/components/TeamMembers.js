import React, { useEffect, useState } from 'react';
import axios from 'axios'; // use Axios for HTTP requests
import { Autocomplete, Avatar, Button, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTeam, fetchTeams, setAuthToken, updateTeam } from '../services/AdminService';

const TeamMembers = () => {

  const [teamData, setTeamData] = useState([]);
  const [teamId, setTeamId] = useState(0);
  // const [teamMembers, setTeamMembers] = useState([
  //   "Paris", "London", "New York", "Tokyo", "Berlin",
  //   "Buenos Aires", "Cairo", "Canberra", "Rio de Janeiro", "Dublin"
  // ]);
  const [checked, setChecked] = useState([1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTeamQuery, setSearchTeamQuery] = useState("");
  
  const [selectedTeam, setSelectedTeam] = useState(null);

  const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => String(d.name).toLowerCase().includes(query.toLowerCase()));
    }
  };

  const dataTeamFiltered = filterData(searchTeamQuery, teamData);
  // const dataUserFiltered = filterData(searchQuery, teamMembers);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      description: team.description
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      
      const response = await updateTeam(selectedTeam.id,formData);
      console.log('Project deleted successfully:', response);
      loadTeams();
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error appropriately
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setAuthToken(token); // Set the auth token before making requests

    try {
      console.log('Sending data with', token);
      console.log(formData);

      const response = await deleteTeam(selectedTeam.id);
      console.log('Project deleted successfully:', response);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error appropriately
    }
  };

  const loadTeams = async () => {
    try {
      setAuthToken(token); // Set the auth token before making requests
      const teams = await fetchTeams();
     
      
      console.log(teams);
      setTeamData(teams);
    } catch (error) {
      console.error('Failed to load teams:', error);
    }
  };

  useEffect(() => {
   
    loadTeams();
   
  }, [token]);


  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      {/* Project Select List on the Left Side */}
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ padding: 2, height: { xs: 'auto', sm: '100%' }, maxHeight: { sm: 600 }, overflow: 'auto', marginBottom: { xs: 2, sm: 0 } }}>
          <h2 className="my-4" >Select Team</h2>
          <SearchBar searchQuery={searchTeamQuery} setSearchQuery={setSearchTeamQuery} />
          <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
            {dataTeamFiltered.map((team, index) => (
              <ListItem key={index} disablePadding onClick={() => handleTeamClick(team)}>
                <ListItemButton>
                  {/* <ListItemAvatar>
                    <Avatar alt={`Avatar n°${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                  </ListItemAvatar> */}
                  <ListItemText primary={team.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Form on the Right Side */}
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h2 className="my-4">Edit Team</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="txtField"
                  label="Team Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="txtField"
                  label="Team Description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 200, overflow: 'auto', bgcolor: 'background.paper' }}>
                  {dataUserFiltered.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem
                        key={value}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt={`Avatar n°${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={value} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid> */}

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Team
                </Button>
                <Button onClick={handleDelete} sx={{ marginLeft: '10px' }} color="error" variant="contained" startIcon={<DeleteIcon />}>
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

export default TeamMembers;
