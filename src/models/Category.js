/**
 * Category model and factory functions
 */

const CATEGORY_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

/**
 * Create a new category object
 * @param {Object} categoryData - Category data
 * @returns {Object} Category object
 */
export const createCategory = ({
  name,
  color = null,
}) => {
  return {
    id: generateCategoryId(),
    name: name.trim(),
    color: color || getRandomColor(),
    createdAt: new Date().toISOString(),
  };
};

/**
 * Generate a unique category ID
 * @returns {string} Unique category ID
 */
const generateCategoryId = () => {
  return `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get a random color from the predefined palette
 * @returns {string} Color hex code
 */
const getRandomColor = () => {
  return CATEGORY_COLORS[Math.floor(Math.random() * CATEGORY_COLORS.length)];
};

/**
 * Get all available colors
 * @returns {Array} Array of color hex codes
 */
export const getAvailableColors = () => {
  return [...CATEGORY_COLORS];
};