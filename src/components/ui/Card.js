import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  padding = '16px',
  shadow = true,
  border = true,
  className = '',
  ...props
}) => {
  const cardStyles = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: border ? '1px solid #dee2e6' : 'none',
    boxShadow: shadow ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
    overflow: 'hidden',
    ...props.style,
  };

  const headerStyles = {
    padding: padding,
    borderBottom: footer || title ? '1px solid #dee2e6' : 'none',
    backgroundColor: '#f8f9fa',
  };

  const bodyStyles = {
    padding: padding,
  };

  const footerStyles = {
    padding: padding,
    borderTop: '1px solid #dee2e6',
    backgroundColor: '#f8f9fa',
  };

  const titleStyles = {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#495057',
  };

  const subtitleStyles = {
    margin: '0',
    fontSize: '14px',
    color: '#6c757d',
  };

  return (
    <div className={className} style={cardStyles} {...props}>
      {(title || subtitle) && (
        <div style={headerStyles}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}
      <div style={bodyStyles}>{children}</div>
      {footer && <div style={footerStyles}>{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.node,
  padding: PropTypes.string,
  shadow: PropTypes.bool,
  border: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Card;