import axios from 'axios'
import { Task } from '../types/calendarTypes'
import toast from 'react-hot-toast'
import { store } from '../store';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL 
})

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export const TaskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get(`/task/gettasks`)
      console.log('fetching data',response);
      
      console.log(response.data.tasks);
      
      return response.data.tasks
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
  },

  // Get all Users
  getAllUsers: async () => {
    try {
      const response = await api.get('/users/listallUsers')
      return response.data
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
  },

  // Create a new task
  createTask: async (task: Omit<Task, 'id'>) => {
    try {
      const response = await api.post('/task/create', task)
      toast.success('task added success')

      
      return response.data
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Error adding task')

      throw error
    }
  },

  // Update a task
  updateTask: async (taskData:any) => {
    try {
      const response = await api.put(`/task/${taskData.tasksId}`, taskData)
      toast.success('task updated')
      return response.data
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('error updating task')

      throw error
    }
  },

  // Delete a task
  deleteTask: async (id: number) => {
    try {
      const response = await api.delete(`/task/${id}`)
      toast.success('task deleted')
      return response.data
      
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('error deleting task')
      throw error
    }
  },

  getInfo:async()=>{
    try {
        const response = await api.get(`/task/info`)
        return response.data
    } catch (error) {
        console.error('Error fetching info:', error)
      toast.error('Error fetching info')
      throw error
    }
  }
}

export const userApi = {
    getUsers:async()=>{
        try {
            const response = await api.get(`/users/listallUsers`)
        
      return response.data.users
        } catch (error) {
            console.error('Error deleting task:', error)
      
      throw error
        }
    },

    promotUser:async(data:any)=>{
        try {
            const response = await api.put('/users/promote',data);
            toast.success('user promoted')
            return response.data
        } catch (error) { 
            toast.error('error updating user role')
      throw error
        }
    }






}