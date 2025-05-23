import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const NavigationLink = ({
  to,
  children,
  icon,
  exact = false,
  className = '',
  activeClassName = 'bg-blue-50 text-blue-700',
  inactiveClassName = 'text-gray-700 hover:bg-gray-100',
  onClick
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);
  
  const baseClasses = 'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors';
  
  return (
    <Link
      to={to}
      className={`
        ${baseClasses} 
        ${isActive ? activeClassName : inactiveClassName} 
        ${className}
      `}
      onClick={onClick}
    >
      {icon && (
        <span className={`mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
          {icon}
        </span>
      )}
      {children}
    </Link>
  );
};

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  exact: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  inactiveClassName: PropTypes.string,
  onClick: PropTypes.func
};

export default NavigationLink;