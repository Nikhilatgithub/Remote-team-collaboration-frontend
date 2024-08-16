import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import { forgotPassword, resetPassword } from '../services/OtpService';

const Recovery = () => {
    const [progressD, setProgressD] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Verify OTP and Reset Password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            setProgressD(true);
            await forgotPassword(email);
            setProgressD(false);
            setStep(2);
        } catch (err) {
            setProgressD(false);
            const errorMessage = err.response?.data || 'Error sending OTP. Please try again.';
            setError(errorMessage);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setProgressD(true);
            await resetPassword( email, otp, newPassword);
            setProgressD(false);
            navigate('/login');
        } catch (err) {
            setProgressD(false);
            const errorMessage = err.response?.data || 'Invalid OTP or error resetting password. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={4}>
                {step === 1 ? (
                    <form onSubmit={handleEmailSubmit}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Forgot Password
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Send OTP
                        </Button>
                          
            {progressD ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <Box sx={{ display: 'center' , alignItems: 'center' }}>
                <CircularProgress />
            </Box></div>) : (<div></div>)}
         
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Reset Password
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            fullWidth
                            label="OTP"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Reset Password
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default Recovery;
