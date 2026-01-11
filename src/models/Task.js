/**
 * Task model and factory functions
 */

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

/**
 * Create a new task object
 * @param {Object} taskData - Task data
 * @returns {Object} Task object
 */
export const createTask = ({
  title,
  description = '',
  priority = PRIORITY_LEVELS.MEDIUM,
  dueDate = null,
  categoryId = null,
  completed = false,
}) => {
  const now = new Date().toISOString();

  return {
    id: generateTaskId(),
    title: title.trim(),
    description: description.trim(),
    priority,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    categoryId,
    completed,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Update an existing task
 * @param {Object} task - Task to update
 * @param {Object} updates - Updates to apply
 * @returns {Object} Updated task
 */
export const updateTask = (task, updates) => {
  return {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Generate a unique task ID
 * @returns {string} Unique task ID
 */
const generateTaskId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if a task is overdue
 * @param {Object} task - Task to check
 * @returns {boolean} Whether task is overdue
 */
export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.completed) return false;
  return new Date(task.dueDate) < new Date();
};

/**
 * Check if a task is due today
 * @param {Object} task - Task to check
 * @returns {boolean} Whether task is due today
 */
export const isTaskDueToday = (task) => {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  const dueDate = new Date(task.dueDate);
  return dueDate.toDateString() === today.toDateString();
};

/**
 * Check if a task is due soon (within 3 days)
 * @param {Object} task - Task to check
 * @returns {boolean} Whether task is due soon
 */
export const isTaskDueSoon = (task) => {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  const dueDate = new Date(task.dueDate);
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3;
};