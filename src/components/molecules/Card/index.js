import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '../../atoms/Typography';

const Card = ({
  children,
  title,
  titleLevel = 3,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  onClick,
  hover = false,
  shadow = 'medium',
  border = true,
  padding = 'medium'
}) => {
  // Estilos base
  const baseClass = 'bg-white rounded-lg overflow-hidden';
  
  // Mapeo de sombras
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg',
  };
  
  // Mapeo de padding
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };
  
  // Estilos condicionales
  const hoverClass = hover ? 'transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg' : '';
  const borderClass = border ? 'border border-gray-200' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`
        ${baseClass} 
        ${shadowClasses[shadow]} 
        ${borderClass} 
        ${hoverClass} 
        ${cursorClass} 
        ${className}
      `}
      onClick={onClick}
    >
      {title && (
        <div className={`border-b border-gray-200 ${paddingClasses[padding]} ${headerClassName}`}>
          <Heading level={titleLevel} className="mb-0">
            {title}
          </Heading>
        </div>
      )}
      
      <div className={`${paddingClasses[padding]} ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 ${paddingClasses[padding]} bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  titleLevel: PropTypes.number,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footer: PropTypes.node,
  footerClassName: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
  shadow: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  border: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
};

export default Card;