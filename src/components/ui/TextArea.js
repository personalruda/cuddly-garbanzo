import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ label, value, onChange, placeholder, rows = 3, ...props }) => (
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
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#495057',
        backgroundColor: '#fff',
        resize: 'vertical',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
      }}
      {...props}
    />
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default TextArea;