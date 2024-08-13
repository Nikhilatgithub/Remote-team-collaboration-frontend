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

export const createProject = async (formData) => {
    try {
      const response = await apiClient.post('/manager/projects', formData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  export const updateProject = async (formData,id) => {
    try {
      const response = await apiClient.put('/admin/projects/'+id, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  export const fetchProject = async () => {
    try {
      const response = await apiClient.get('/admin/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  export const deleteProject = async (projectId) => {
    try {
      const response = await apiClient.delete(`/admin/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };
// Add more functions to handle other API requests as needed

// user related crud opration

export const createUser = async (formData) => {
    try {
      const response = await apiClient.post('/admin/users', formData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  export const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
export default apiClient;
