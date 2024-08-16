import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import '../styles/SimpleStyle.css';
import SearchBar from './SearchBar';
import { getEmployeeTeam, getTeamMembers } from '../services/EmployeeService';


const MyTeam = () => {
  const [teamData, setTeamData] = useState({name: '', description: ''});
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch team members on component load

    const loadTeam = async () => {
      try {
        const team = await getEmployeeTeam();
        setTeamData({
          name: team.name,
          description: team.description
        })
      } catch (error) {
        console.error('Failed to load teams:', error);
      }
    };

    loadTeam();
    
    getTeamMembers()
      .then(data => {
        console.log(data);
        setTeamMembers(data);
        // Assuming you also want to set teamData here
        // Replace this with real logic if needed
     
      })
      .catch(error => console.error('Error fetching team members:', error));
  }, []);

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => (d.email).toLowerCase().includes(query.toLowerCase()));
    }
  };

  const dataUserFiltered = filterData(searchQuery, teamMembers);

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" className="my-4">My Team Members</Typography>
          <Typography>Team {teamData.name}</Typography> {/* Replace with real team data */}
          <Typography>Description {teamData.description}</Typography> {/* Replace with real team data */}
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <List dense sx={{ width: '100%', maxWidth: '100%', position: 'relative', maxHeight: 200, overflow: 'auto', bgcolor: 'background.paper' }}>
            {dataUserFiltered.map((value, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText primary={value.email} /> {/* Assuming value is an object with a name property */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyTeam;
