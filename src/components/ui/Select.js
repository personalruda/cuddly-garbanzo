import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ label, value, onChange, children, style, ...props }) => (
  <div>
    {label && (
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#495057'
      }}>
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: '#fff',
        ...style
      }}
      {...props}
    >
      {children}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Select;