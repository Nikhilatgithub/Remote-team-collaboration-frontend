import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Autocomplete, Avatar, Button, Checkbox, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Paper, Select, TextField } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';
const TeamMembers = () => {
  const [teamData, setTeamData] = useState(["012 Alpha",
  "12 Delta",
  "983 Gamma"]);
  const [teamMembers, setTeamMember] = useState([ "Paris",
  "London",
  "New York",
  "Tokyo",
  "Berlin",
  "Buenos Aires",
  "Cairo",
  "Canberra",
  "Rio de Janeiro",
  "Dublin"]);
  const [checked, setChecked] = React.useState([1]);
  const [searchQuery, setSearchQuery] = useState("");
  

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const dataFiltered = filterData(searchQuery, teamMembers);

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
   
<Paper elevation={3} sx={{ padding: 2, maxWidth: 500,marginLeft:5,
     marginBottom: 10,marginTop:2}}>

      <h2 className="my-4">Add Team Members</h2>
      <form onSubmit={handleSubmit}>

      <Grid container spacing={2}>
              <Grid item xs={12}>
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        className="txtSearch"
        options={teamData}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Team Name" />}
        />
   </Grid>
              <Grid item xs={12} >

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <List dense sx={{ width: '100%', maxWidth: '100%' , position: 'relative',
        maxHeight: 200,
        overflow: 'auto', bgcolor: 'background.paper' }}>
      {dataFiltered.map((value) => {
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
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </Grid>

              <Grid item xs={12} >
          <Button type="submit" variant="contained" color="primary">
           Save Team
          </Button>
          <Button  sx={{ marginLeft: '10px' }} color="error"  variant="contained" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Grid>
      </Grid>

       
      </form>

      </Paper>
  
  );
};

export default TeamMembers;

