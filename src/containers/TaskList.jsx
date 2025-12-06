import { useCallback, useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { TaskFormDialog } from "../components/TaskFormDialog";
import { Snackbar } from "../components/Snackbar";
import { taskService } from "../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddTask = async (taskData) => {
    if (!taskData.title || !taskData.status || !taskData.dueDate) {
      setSnackbar({
        open: true,
        message: 'Missing required fields',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await taskService.createTask(taskData);
      
      if (response.success) {
        setTasks(response);
        setDialogOpen(false);
        setSnackbar({
          open: true,
          message: 'Task created successfully',
          severity: 'success'
        });
        await fetchTasks();
      } else {
        return { success: false, message: response.message };
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error creating task',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAllTasks();
      
      if (response.success) {
        setTasks(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = useCallback(async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      if (response.success) {
        await fetchTasks();
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 h-screen">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <span className="text-xl">+</span>
            Add Task
          </button>
        </div>

        {isLoading ?
        (<div>Loading...</div>):
        tasks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No tasks yet. Click "Add Task" to create one!
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto h-3/4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        <TaskFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleAddTask}
        />

        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />

        <button
          onClick={() => setDialogOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-2xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TaskList;