// services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Base URL for your API

// Create an instance of axios with the base URL and default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the JWT token in the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

// Function to fetch teams
export const fetchTeams = async () => {
  try {
    const response = await apiClient.get('/manager/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Add more functions to handle other API requests as needed

export default apiClient;
