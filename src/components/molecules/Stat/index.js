import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../atoms/Typography';

const Stat = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className = '',
  valueClassName = '',
  titleClassName = '',
  iconBackground = 'bg-blue-100'
}) => {
  // Configurar colores para el tipo de cambio
  const changeColors = {
    positive: {
      text: 'text-green-600',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    negative: {
      text: 'text-red-600',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    neutral: {
      text: 'text-gray-500',
      icon: null
    }
  };

  const changeStyle = changeColors[changeType] || changeColors.neutral;

  return (
    <div className={`bg-white overflow-hidden rounded-lg ${className}`}>
      <div className="p-5">
        <div className="flex items-center">
          {icon && (
            <div className={`flex-shrink-0 rounded-md p-3 ${iconBackground}`}>
              {icon}
            </div>
          )}
          <div className={icon ? "ml-5" : ""}>
            <Text className={`font-medium text-gray-500 truncate ${titleClassName}`}>
              {title}
            </Text>
            <div className="mt-1">
              <Text className={`text-3xl font-semibold text-gray-900 ${valueClassName}`}>
                {value}
              </Text>
            </div>
          </div>
        </div>
      </div>
      
      {change && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="flex items-center">
            {changeStyle.icon && (
              <span className={`${changeStyle.text} mr-1`}>
                {changeStyle.icon}
              </span>
            )}
            <Text size="small" className={changeStyle.text}>
              {change}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  icon: PropTypes.node,
  className: PropTypes.string,
  valueClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  iconBackground: PropTypes.string
};

export default Stat;