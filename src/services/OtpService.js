
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Base URL for your API

// Create an instance of axios with the base URL and default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

export const resetPassword = async (email, otp, newPassword) => {
    try {
        const response = await apiClient.post('/reset-password', {
            email,
            otp,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};