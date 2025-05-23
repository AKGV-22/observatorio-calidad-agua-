import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardWidget = ({ title, icon, data, type = 'text', linkTo, linkText = 'Ver más' }) => {
  const navigate = useNavigate();
  
  const renderWidgetContent = () => {
    switch (type) {
      case 'stat':
        return (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{data.value}</span>
            <span className="text-sm text-gray-500">{data.unit}</span>
            {data.change && (
              <div className={`mt-2 flex items-center ${data.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>{data.change > 0 ? '↑' : '↓'} {Math.abs(data.change)}%</span>
                <span className="ml-1 text-xs">vs. mes anterior</span>
              </div>
            )}
          </div>
        );
      
      case 'status':
        const statusColors = {
          optimo: 'bg-green-100 text-green-800',
          aceptable: 'bg-yellow-100 text-yellow-800',
          alto: 'bg-red-100 text-red-800',
          bajo: 'bg-blue-100 text-blue-800'
        };
        
        return (
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{data.parameter}</span>
            <div className={`mt-2 px-3 py-1 rounded-full ${statusColors[data.status] || 'bg-gray-100 text-gray-800'}`}>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </div>
            <span className="mt-1 text-sm">{data.value} {data.unit}</span>
          </div>
        );
      
      case 'list':
        return (
          <ul className="divide-y divide-gray-200">
            {data.items.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </li>
            ))}
          </ul>
        );
      
      default:
        return <p className="text-gray-600">{data}</p>;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {icon && (
          <div className="text-blue-500">
            {icon}
          </div>
        )}
      </div>
      
      <div className="my-4">
        {renderWidgetContent()}
      </div>
      
      {linkTo && (
        <div className="mt-4 text-right">
          <button 
            onClick={() => navigate(linkTo)}
            className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
          >
            {linkText} →
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;