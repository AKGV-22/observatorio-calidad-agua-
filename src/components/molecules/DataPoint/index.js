import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../atoms/Typography';

const getStatusColor = (status) => {
  switch(status) {
    case 'good':
      return 'text-green-600 bg-green-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'normal':
    default:
      return 'text-blue-600 bg-blue-100';
  }
};

const DataPoint = ({
  label,
  value,
  unit = '',
  status = 'normal',
  icon,
  trend,
  className = '',
  size = 'medium',
  description
}) => {
  const statusColor = getStatusColor(status);
  
  const sizeClasses = {
    small: {
      label: 'text-xs',
      value: 'text-lg font-semibold',
      icon: 'h-4 w-4',
      badge: 'text-xs px-1.5 py-0.5',
    },
    medium: {
      label: 'text-sm',
      value: 'text-2xl font-bold',
      icon: 'h-5 w-5',
      badge: 'text-sm px-2 py-1',
    },
    large: {
      label: 'text-base',
      value: 'text-3xl font-bold',
      icon: 'h-6 w-6',
      badge: 'text-base px-2.5 py-1',
    },
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  
  const renderTrendIcon = () => {
    if (!trend) return null;
    
    if (trend === 'up') {
      return (
        <svg className={`${sizeClass.icon} text-green-500 inline-block ml-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className={`${sizeClass.icon} text-red-500 inline-block ml-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    } else if (trend === 'stable') {
      return (
        <svg className={`${sizeClass.icon} text-gray-500 inline-block ml-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      );
    }
    
    return null;
  };
  
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center mb-1">
        {icon && (
          <span className="mr-1.5 text-gray-500">
            {icon}
          </span>
        )}
        <Text className={`text-gray-500 ${sizeClass.label}`}>
          {label}
        </Text>
      </div>
      
      <div className="flex items-baseline">
        <span className={`${sizeClass.value} text-gray-900`}>
          {value}
          {unit && <span className="ml-1 text-gray-600 text-sm font-normal">{unit}</span>}
        </span>
        {renderTrendIcon()}
        
        {status && status !== 'normal' && (
          <span className={`${statusColor} rounded-full ${sizeClass.badge} ml-2 font-medium`}>
            {status === 'good' && 'Óptimo'}
            {status === 'warning' && 'Precaución'}
            {status === 'critical' && 'Crítico'}
          </span>
        )}
      </div>
      
      {description && (
        <Text size="small" color="muted" className="mt-1">
          {description}
        </Text>
      )}
    </div>
  );
};

DataPoint.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  status: PropTypes.oneOf(['normal', 'good', 'warning', 'critical']),
  icon: PropTypes.node,
  trend: PropTypes.oneOf(['up', 'down', 'stable']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  description: PropTypes.string
};

export default DataPoint;