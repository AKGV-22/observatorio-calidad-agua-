import React from 'react';
import PropTypes from 'prop-types';

// Componente para títulos
export const Heading = ({ 
  level = 1, 
  children, 
  className = '',
  color = 'default'
}) => {
  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600',
  };

  const selectedColor = colorClasses[color] || colorClasses.default;
  
  const baseClasses = 'font-bold';
  const sizeClasses = {
    1: 'text-3xl sm:text-4xl',
    2: 'text-2xl sm:text-3xl',
    3: 'text-xl sm:text-2xl',
    4: 'text-lg sm:text-xl',
    5: 'text-base sm:text-lg',
    6: 'text-sm sm:text-base',
  };
  
  const Tag = `h${level}`;
  
  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${selectedColor} ${className}`}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'white', 'success', 'danger']),
};

// Componente para párrafos
export const Paragraph = ({ 
  children, 
  size = 'medium', 
  className = '',
  color = 'default'
}) => {
  const colorClasses = {
    default: 'text-gray-700',
    primary: 'text-blue-600',
    secondary: 'text-gray-500',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600',
    muted: 'text-gray-400',
  };

  const selectedColor = colorClasses[color] || colorClasses.default;
  
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  
  return (
    <p className={`${sizeClasses[size]} ${selectedColor} ${className}`}>
      {children}
    </p>
  );
};

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'white', 'success', 'danger', 'muted']),
};

// Componente de texto en línea
export const Text = ({ 
  children, 
  size = 'medium', 
  className = '',
  color = 'default',
  as = 'span',
  weight = 'normal'
}) => {
  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600',
    muted: 'text-gray-400',
  };

  const selectedColor = colorClasses[color] || colorClasses.default;
  
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const Tag = as;
  
  return (
    <Tag className={`${sizeClasses[size]} ${selectedColor} ${weightClasses[weight]} ${className}`}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'white', 'success', 'danger', 'muted']),
  as: PropTypes.oneOf(['span', 'div', 'strong', 'em']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold']),
};

// Exportar todos los componentes
export default {
  Heading,
  Paragraph,
  Text
};