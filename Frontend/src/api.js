import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL if different
});

// Project-related API calls
export const getProjects = () => api.get('/projects');
export const createProject = (project) => api.post('/projects', project);
export const updateProject = (id, project) => api.put(`/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Task-related API calls
export const getTasks = (projectId) => api.get(`/projects/${projectId}/tasks`);
export const createTask = (projectId, task) => api.post(`/projects/${projectId}/tasks`, task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;