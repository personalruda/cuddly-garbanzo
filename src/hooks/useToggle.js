import { useState } from 'react';

/**
 * Custom hook for managing boolean toggle state
 * @param {boolean} initialValue - Initial boolean value (default: false)
 * @returns {[boolean, function, object]} - Tuple of current value, toggle function, and utility object
 */
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const set = setValue;

  return [
    value,
    toggle,
    {
      set,
      setTrue,
      setFalse,
      toggle,
    },
  ];
};

export default useToggle;