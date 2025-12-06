import axiosInstance from '../config/axiosConfig';

class TaskService {
  // Get all tasks
  async getAllTasks() {
    try {
      const response = await axiosInstance.get('/tasks');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get single task by ID
  async getTaskById(id) {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create new task
  async createTask(taskData) {
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update task
  async updateTask(id, taskData) {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete task
  async deleteTask(id) {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get tasks by status
  async getTasksByStatus(status) {
    try {
      const response = await axiosInstance.get(`/tasks/status/${status}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle errors consistently
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data.errors || []
      };
    } else if (error.request) {
      // No response received
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0
      };
    } else {
      // Error in request setup
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: 0
      };
    }
  }
}

// Export a singleton instance
export default new TaskService();