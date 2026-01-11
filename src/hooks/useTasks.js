import { useState, useEffect, useCallback } from 'react';
import { taskStorage } from '../utils/storage';
import { createTask, updateTask, isTaskOverdue, isTaskDueToday, isTaskDueSoon } from '../models';

/**
 * Custom hook for managing tasks with localStorage persistence
 * @returns {Object} Task management functions and state
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = taskStorage.getAll();
      setTasks(storedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      taskStorage.saveAll(tasks);
    }
  }, [tasks, loading]);

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Object} Created task
   */
  const createNewTask = useCallback((taskData) => {
    const newTask = createTask(taskData);
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  }, []);

  /**
   * Update an existing task
   * @param {string} taskId - Task ID to update
   * @param {Object} updates - Updates to apply
   * @returns {Object|null} Updated task or null if not found
   */
  const updateExistingTask = useCallback((taskId, updates) => {
    const updatedTask = updateTask(
      tasks.find(task => task.id === taskId),
      updates
    );
    if (updatedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
      return updatedTask;
    }
    return null;
  }, [tasks]);

  /**
   * Delete a task
   * @param {string} taskId - Task ID to delete
   * @returns {boolean} True if deleted, false if not found
   */
  const deleteTaskById = useCallback((taskId) => {
    const deleted = taskStorage.delete(tasks, taskId);
    if (deleted) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
    return deleted;
  }, [tasks]);

  /**
   * Toggle task completion status
   * @param {string} taskId - Task ID to toggle
   * @returns {Object|null} Updated task or null if not found
   */
  const toggleTaskCompletion = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      return updateExistingTask(taskId, { completed: !task.completed });
    }
    return null;
  }, [tasks, updateExistingTask]);

  /**
   * Get task by ID
   * @param {string} taskId - Task ID to find
   * @returns {Object|null} Task object or null if not found
   */
  const getTaskById = useCallback((taskId) => {
    return tasks.find(task => task.id === taskId) || null;
  }, [tasks]);

  /**
   * Get tasks by category
   * @param {string} categoryId - Category ID to filter by
   * @returns {Array} Filtered tasks
   */
  const getTasksByCategory = useCallback((categoryId) => {
    return tasks.filter(task => task.categoryId === categoryId);
  }, [tasks]);

  /**
   * Get tasks by completion status
   * @param {boolean} completed - Completion status to filter by
   * @returns {Array} Filtered tasks
   */
  const getTasksByCompletion = useCallback((completed) => {
    return tasks.filter(task => task.completed === completed);
  }, [tasks]);

  /**
   * Get overdue tasks
   * @returns {Array} Overdue tasks
   */
  const getOverdueTasks = useCallback(() => {
    return tasks.filter(task => isTaskOverdue(task));
  }, [tasks]);

  /**
   * Get tasks due today
   * @returns {Array} Tasks due today
   */
  const getTasksDueToday = useCallback(() => {
    return tasks.filter(task => isTaskDueToday(task));
  }, [tasks]);

  /**
   * Get tasks due soon (within 3 days)
   * @returns {Array} Tasks due soon
   */
  const getTasksDueSoon = useCallback(() => {
    return tasks.filter(task => isTaskDueSoon(task));
  }, [tasks]);

  /**
   * Get task statistics
   * @returns {Object} Task statistics
   */
  const getTaskStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = getOverdueTasks().length;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks, getOverdueTasks]);

  return {
    // State
    tasks,
    loading,

    // CRUD operations
    createTask: createNewTask,
    updateTask: updateExistingTask,
    deleteTask: deleteTaskById,
    toggleTaskCompletion,
    getTaskById,

    // Filtering operations
    getTasksByCategory,
    getTasksByCompletion,
    getOverdueTasks,
    getTasksDueToday,
    getTasksDueSoon,

    // Statistics
    getTaskStats,
  };
};

export default useTasks;