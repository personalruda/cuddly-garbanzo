import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

/**
 * Custom hook for API calls with loading and error states
 * @param {Function} apiFunction - Function that returns a promise (usually an API call)
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {object} options - Additional options
 * @returns {object} - { data, loading, error, refetch }
 */
const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(!options.manual);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      if (options.onError) {
        options.onError(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options]);

  useEffect(() => {
    if (!options.manual) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, execute, options.manual]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch,
    execute: options.manual ? execute : undefined,
  };
};

// Specific hooks for common HTTP methods
export const useApiGet = (endpoint, options = {}) => {
  return useApi(() => api.get(endpoint), [endpoint], options);
};

export const useApiPost = (endpoint, data, options = {}) => {
  return useApi(() => api.post(endpoint, data), [endpoint, data], { manual: true, ...options });
};

export const useApiPut = (endpoint, data, options = {}) => {
  return useApi(() => api.put(endpoint, data), [endpoint, data], { manual: true, ...options });
};

export const useApiDelete = (endpoint, options = {}) => {
  return useApi(() => api.delete(endpoint), [endpoint], { manual: true, ...options });
};

export default useApi;