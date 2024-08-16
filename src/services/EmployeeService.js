

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Base URL for your API

// Create an instance of axios with the base URL and default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
    if (token) {
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.Authorization;
    }
  };
export const getEmployeeProjects = async () => {
    try {
      const response = await apiClient.get('/employees/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching employee projects:', error);
      throw error;
    }
  };
  export const getEmployee = async () => {
    try {
      const response = await apiClient.get('/employees/myprofile');
      return response.data;
    } catch (error) {
      console.error('Error fetching employee projects:', error);
      throw error;
    }
  };

  export const getEmployeeTeam= async () => {
    try {
      const response = await apiClient.get('/employees/myteam');
      return response.data;
    } catch (error) {
      console.error('Error fetching employee projects:', error);
      throw error;
    }
  };

  export const getTeamMembers = async () => {
    try {
      const response = await apiClient.get('/employees/team-members');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  };

  export const getAssignedTasks = async () => {
    try {
      const response = await apiClient.get('/employees/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching assigned tasks:', error);
      throw error;
    }
  };

  export const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await apiClient.put(`/employees/tasks/${taskId}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${taskId} status:`, error);
      throw error;
    }
  };
  export const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.put('/employees/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  export const updateUserStatus = async (status) => {
    try {
      const response = await apiClient.put(`/employees/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error updating user status to ${status}:`, error);
      throw error;
    }
  };
      