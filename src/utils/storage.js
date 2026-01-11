/**
 * localStorage utilities for Task Manager
 */

const STORAGE_KEYS = {
  TASKS: 'taskManager_tasks',
  CATEGORIES: 'taskManager_categories',
  SETTINGS: 'taskManager_settings',
};

/**
 * Get data from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored data or default value
 */
const getFromStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Save data to localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

/**
 * Task storage operations
 */
export const taskStorage = {
  getAll: () => getFromStorage(STORAGE_KEYS.TASKS, []),
  saveAll: (tasks) => saveToStorage(STORAGE_KEYS.TASKS, tasks),
  add: (task) => {
    const tasks = taskStorage.getAll();
    tasks.push(task);
    taskStorage.saveAll(tasks);
    return task;
  },
  update: (taskId, updates) => {
    const tasks = taskStorage.getAll();
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
      taskStorage.saveAll(tasks);
      return tasks[index];
    }
    return null;
  },
  delete: (taskId) => {
    const tasks = taskStorage.getAll();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    taskStorage.saveAll(filteredTasks);
    return filteredTasks.length < tasks.length; // Return true if deleted
  },
  getById: (taskId) => {
    const tasks = taskStorage.getAll();
    return tasks.find(task => task.id === taskId) || null;
  },
};

/**
 * Category storage operations
 */
export const categoryStorage = {
  getAll: () => getFromStorage(STORAGE_KEYS.CATEGORIES, []),
  saveAll: (categories) => saveToStorage(STORAGE_KEYS.CATEGORIES, categories),
  add: (category) => {
    const categories = categoryStorage.getAll();
    categories.push(category);
    categoryStorage.saveAll(categories);
    return category;
  },
  update: (categoryId, updates) => {
    const categories = categoryStorage.getAll();
    const index = categories.findIndex(cat => cat.id === categoryId);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      categoryStorage.saveAll(categories);
      return categories[index];
    }
    return null;
  },
  delete: (categoryId) => {
    const categories = categoryStorage.getAll();
    const filteredCategories = categories.filter(cat => cat.id !== categoryId);
    categoryStorage.saveAll(filteredCategories);

    // Also remove category from all tasks
    const tasks = taskStorage.getAll();
    const updatedTasks = tasks.map(task =>
      task.categoryId === categoryId ? { ...task, categoryId: null } : task
    );
    taskStorage.saveAll(updatedTasks);

    return filteredCategories.length < categories.length;
  },
  getById: (categoryId) => {
    const categories = categoryStorage.getAll();
    return categories.find(cat => cat.id === categoryId) || null;
  },
};

/**
 * Settings storage operations
 */
export const settingsStorage = {
  getAll: () => getFromStorage(STORAGE_KEYS.SETTINGS, {
    theme: 'light',
    defaultView: 'dashboard',
    notifications: true,
  }),
  saveAll: (settings) => saveToStorage(STORAGE_KEYS.SETTINGS, settings),
  update: (updates) => {
    const currentSettings = settingsStorage.getAll();
    const newSettings = { ...currentSettings, ...updates };
    settingsStorage.saveAll(newSettings);
    return newSettings;
  },
};