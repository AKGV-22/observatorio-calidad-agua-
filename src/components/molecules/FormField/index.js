import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import { Text } from '../../atoms/Typography';

const FormField = ({
  label,
  name,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = null,
  helpText,
  className = '',
  labelClassName = '',
  inputClassName = '',
  hideLabel = false,
  ...props
}) => {
  // Generar un ID si no se proporciona
  const fieldId = id || `field-${name}`;
  
  return (
    <div className={className}>
      {!hideLabel && (
        <label 
          htmlFor={fieldId} 
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        error={error}
        className={inputClassName}
        {...props}
      />
      
      {helpText && !error && (
        <Text size="small" color="muted" className="mt-1">
          {helpText}
        </Text>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  hideLabel: PropTypes.bool
};

export default FormField;