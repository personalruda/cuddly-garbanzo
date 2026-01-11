import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value
 * @param {*} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {*} - The debounced value
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;