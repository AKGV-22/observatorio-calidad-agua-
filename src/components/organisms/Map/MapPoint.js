import React from 'react';
import PropTypes from 'prop-types';
import colorClasses from './colorClasses';

const MapPoint = ({ 
  point, 
  active, 
  onClick, 
  color = 'blue'
}) => {
  const selectedColor = colorClasses[color] || colorClasses.blue;
  
  return (
    <div 
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 
        cursor-pointer z-20 transition-all duration-200
        ${active ? 'scale-125 z-30' : 'hover:scale-110'}
      `}
      style={{ 
        left: `${point.x}%`, 
        top: `${point.y}%`,
      }}
      onClick={() => onClick(point)}
    >
      <div className={`
        h-4 w-4 rounded-full ${selectedColor} 
        flex items-center justify-center
        shadow-md
      `}>
        {active && (
          <div className="h-2 w-2 rounded-full bg-white"></div>
        )}
      </div>
      {active && point.label && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
          {point.label}
        </div>
      )}
    </div>
  );
};

MapPoint.propTypes = {
  point: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    label: PropTypes.string,
    data: PropTypes.object,
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'gray']),
};

export default MapPoint;