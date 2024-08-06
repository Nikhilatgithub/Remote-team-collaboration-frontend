import React, { useState } from 'react';
import axios from 'axios'; //  use Axios for HTTP requests
import { Paper, TextField, Button } from '@mui/material';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
 
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
    axios.post('/api/users', formData)
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
    <div className="container">

<Paper elevation={3} sx={{ padding: 2, maxWidth: 500,marginLeft:5,
     marginBottom: 10,marginTop:2}}>

      <h2 className="my-4">User Registration</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <TextField
            className="txtField"
            label="User Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <TextField
            className="txtField"
            label="Email Id"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <TextField
            className="txtField"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        

        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
           Register
          </Button>
        </div>

    
      </form>

      </Paper>
    </div>
  );
};

export default UserForm;

