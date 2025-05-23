import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  name,
  id,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  required = false,
  className = '',
  error = null,
  min,
  max,
  step
}) => {
  // Definir clases base
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  
  // Clases condicionales
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300'
    : disabled
      ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
      : 'border-gray-300 text-gray-900 placeholder-gray-400';

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${stateClasses} ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'date', 'url', 'tel', 'search']),
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;