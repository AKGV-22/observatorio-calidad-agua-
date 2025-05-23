import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const ComparisonChart = ({ 
  data, 
  parameter, 
  height = 300, 
  showLegend = true, 
  title = 'Comparación de valores por sitio'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-center text-gray-500">No hay datos disponibles para comparar</p>
      </div>
    );
  }
  
  // Preparar datos para el gráfico
  const chartData = data.map(item => ({
    siteName: item.siteName,
    value: item.value
  }));
  
  // Definir colores basados en el estado
  const getBarColor = (value) => {
    if (!parameter?.interpretation) return '#2563eb';
    
    for (const interp of parameter.interpretation) {
      if (value >= interp.range[0] && value <= interp.range[1]) {
        switch(interp.status) {
          case 'óptimo': return '#059669';
          case 'aceptable': return '#d97706';
          case 'alto': return '#dc2626';
          case 'bajo': return '#3b82f6';
          default: return '#2563eb';
        }
      }
    }
    
    return '#2563eb';
  };
  
  // Valor límite legal si está disponible
  const legalLimit = parameter?.legalLimit;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="siteName" />
          <YAxis label={{ value: parameter?.unit || 'unidad', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value) => [`${value} ${parameter?.unit || ''}`, parameter?.name || 'Valor']}
          />
          {showLegend && <Legend />}
          
          <Bar 
            dataKey="value" 
            name={parameter?.name || 'Valor'} 
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />
          
          {/* Mostrar líneas de referencia para límites legales */}
          {legalLimit?.min && (
            <ReferenceLine 
              y={legalLimit.min} 
              stroke="#0369a1" 
              strokeDasharray="3 3"
              label={{ value: `Mín: ${legalLimit.min}`, position: 'insideBottomLeft' }}
            />
          )}
          
          {legalLimit?.max && (
            <ReferenceLine 
              y={legalLimit.max} 
              stroke="#b91c1c" 
              strokeDasharray="3 3"
              label={{ value: `Máx: ${legalLimit.max}`, position: 'insideTopLeft' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;