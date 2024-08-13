import React, { useState } from 'react';
import axios from 'axios'; // use Axios for HTTP requests
import { Autocomplete, Avatar, Button, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';

const MyTeam = () => {
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
      
      <Grid item xs={12} >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <h2 className="my-4">My Team Members</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
          
          </Grid>
              <Grid item xs={12}>
              <Typography >
               Team {formData.name}
             </Typography>
             <Typography >
               Description {formData.description}
             </Typography>
          
         </Grid>
              <Grid item xs={12}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 200, overflow: 'auto', bgcolor: 'background.paper' }}>
                  {dataUserFiltered.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem
                        key={value}
                       
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

             
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyTeam;