import React, { useState } from 'react';
import axios from 'axios'; // use Axios for HTTP requests
import { Autocomplete, Avatar, Button, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamMembers = () => {
  const [teamData, setTeamData] = useState(["012 Alpha", "12 Delta", "983 Gamma"]);
  const [teamMembers, setTeamMembers] = useState([
    "Paris", "London", "New York", "Tokyo", "Berlin",
    "Buenos Aires", "Cairo", "Canberra", "Rio de Janeiro", "Dublin"
  ]);
  const [checked, setChecked] = useState([1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTeamQuery, setSearchTeamQuery] = useState("");
  
  
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
    }
  };
 

  


  const dataTeamFiltered = filterData(searchTeamQuery, teamData);
  const dataUserFiltered = filterData(searchQuery, teamMembers);

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

    const [formData, setFormData] = useState({
      name: '',
      description: ''
      
   
      // Add more fields as needed
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', teamData)
      .then(response => {
        console.log('User registered successfully:', response.data);
        // Optionally, redirect or show success message
      })
      .catch(error => {
        console.error('Error registering user:', error);
        // Handle error appropriately
      });
  };

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      {/* Project Select List on the Left Side */}
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ padding: 2, height: { xs: 'auto', sm: '100%' }, maxHeight: { sm: 600 }, overflow: 'auto', marginBottom: { xs: 2, sm: 0 } }}>
          <h2 className="my-4" >Select Team</h2>
          <SearchBar searchQuery={searchTeamQuery} setSearchQuery={setSearchTeamQuery} />
          <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
            {dataTeamFiltered.map((team, index) => (
              <ListItem key={index} disablePadding onClick={() => console.log(`Selected team: ${team}`)}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText primary={team} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Form on the Right Side */}
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h2 className="my-4">Add Team Members</h2>
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
          />
         </Grid>
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Team
                </Button>
                <Button sx={{ marginLeft: '10px' }} color="error" variant="contained" startIcon={<DeleteIcon />}>
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