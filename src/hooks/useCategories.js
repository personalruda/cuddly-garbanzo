import { useState, useEffect, useCallback } from 'react';
import { categoryStorage } from '../utils/storage';
import { createCategory } from '../models';

/**
 * Custom hook for managing categories with localStorage persistence
 * @returns {Object} Category management functions and state
 */
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories from localStorage on mount
  useEffect(() => {
    try {
      const storedCategories = categoryStorage.getAll();
      setCategories(storedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    if (!loading) {
      categoryStorage.saveAll(categories);
    }
  }, [categories, loading]);

  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @returns {Object} Created category
   */
  const createNewCategory = useCallback((categoryData) => {
    const newCategory = createCategory(categoryData);
    setCategories(prevCategories => [...prevCategories, newCategory]);
    return newCategory;
  }, []);

  /**
   * Update an existing category
   * @param {string} categoryId - Category ID to update
   * @param {Object} updates - Updates to apply
   * @returns {Object|null} Updated category or null if not found
   */
  const updateExistingCategory = useCallback((categoryId, updates) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId ? { ...category, ...updates } : category
      )
    );
    const updatedCategory = categories.find(cat => cat.id === categoryId);
    return updatedCategory ? { ...updatedCategory, ...updates } : null;
  }, [categories]);

  /**
   * Delete a category
   * @param {string} categoryId - Category ID to delete
   * @returns {boolean} True if deleted, false if not found
   */
  const deleteCategoryById = useCallback((categoryId) => {
    const deleted = categoryStorage.delete(categoryId);
    if (deleted) {
      setCategories(prevCategories =>
        prevCategories.filter(category => category.id !== categoryId)
      );
    }
    return deleted;
  }, []);

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID to find
   * @returns {Object|null} Category object or null if not found
   */
  const getCategoryById = useCallback((categoryId) => {
    return categories.find(category => category.id === categoryId) || null;
  }, [categories]);

  /**
   * Get category name by ID
   * @param {string} categoryId - Category ID to find
   * @returns {string} Category name or 'No Category'
   */
  const getCategoryName = useCallback((categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? category.name : 'No Category';
  }, [getCategoryById]);

  return {
    // State
    categories,
    loading,

    // CRUD operations
    createCategory: createNewCategory,
    updateCategory: updateExistingCategory,
    deleteCategory: deleteCategoryById,
    getCategoryById,
    getCategoryName,
  };
};

export default useCategories;