import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeStyles = {
    small: { fontSize: '14px', padding: '10px' },
    medium: { fontSize: '16px', padding: '20px' },
    large: { fontSize: '18px', padding: '30px' },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizeStyles[size],
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          width: size === 'small' ? '20px' : size === 'large' ? '40px' : '30px',
          height: size === 'small' ? '20px' : size === 'large' ? '40px' : '30px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '10px',
        }}
      />
      <span>{message}</span>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Loading;