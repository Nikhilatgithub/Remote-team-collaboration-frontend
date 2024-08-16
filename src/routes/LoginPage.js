
import React, { useState } from 'react'
import axios from 'axios'; //  use Axios for HTTP requests
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
 
    // Add more fields as needed
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:8080/auth/login',formData) 
      .then(response => {
        console.log('User registered successfully:', response.data);
        localStorage.setItem('token', response.data.token); // Assuming backend returns a token
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userEmail', response.data.email);
       // localStorage.setItem('userEmail', response.email);
       let role = String(response.data.role).toLowerCase();
       if(role==='admin')
       {
        navigate('/admin');
       }
      else if(role==='manager')
       {
        navigate('/manager');
       }
       else if(role==='employee')
       {
        navigate('/employee');
       }
        
       console.log(response);
       // Redirect or do something after successful login
      })
      .catch(error => {
        console.error('Error registering user:', error);
        // Handle error appropriately
      });;

     
     
   
    } catch (error) {
      
      console.error('Login Error:', error);
    }

  };

  return (
    <>
       <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Create an account? Sign up
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/forgot" variant="body2">
                  Forgot Password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </>
  )
}

export default LoginPage;
