import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = false,
  label = '',
  helperText = '',
  required = false,
  className = '',
  ...props
}) => {
  const inputStyles = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${error ? '#dc3545' : '#ced4da'}`,
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#495057',
    backgroundColor: disabled ? '#e9ecef' : '#fff',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    boxSizing: 'border-box',
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
  };

  const errorStyles = {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '4px',
  };

  const helperStyles = {
    color: '#6c757d',
    fontSize: '14px',
    marginTop: '4px',
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        style={inputStyles}
        {...props}
      />
      {error && helperText && (
        <div style={errorStyles}>{helperText}</div>
      )}
      {!error && helperText && (
        <div style={helperStyles}>{helperText}</div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;