import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { groupDataByMonth } from '../../../utils/dateFormatters';

const ParameterChart = ({ data, parameter, height = 300, showLegend = true }) => {
  const [chartData, setChartData] = useState([]);
  const [sites, setSites] = useState([]);
  
  useEffect(() => {
    if (data && data.length > 0) {
      // Agrupar datos por mes
      const groupedData = groupDataByMonth(data);
      
      // Transformar datos para el gráfico
      const transformed = groupedData.map(group => {
        const monthData = { month: `${group.month} ${group.year}` };
        
        // Agrupar por sitio
        group.items.forEach(item => {
          if (!monthData[item.siteName]) {
            monthData[item.siteName] = item.value;
          }
        });
        
        return monthData;
      });
      
      // Extraer sitios únicos
      const uniqueSites = [...new Set(data.map(item => item.siteName))];
      
      setChartData(transformed);
      setSites(uniqueSites);
    }
  }, [data]);
  
  // Si no hay datos, mostrar un mensaje
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-center text-gray-500">No hay datos disponibles para este parámetro</p>
      </div>
    );
  }
  
  // Colores para las líneas
  const colors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626'];
  
  // Valor límite legal si está disponible
  const legalLimit = parameter?.legalLimit;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Evolución de {parameter?.name || 'Parámetro'} ({parameter?.unit || 'unidad'})
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          
          {sites.map((site, index) => (
            <Line 
              key={site}
              type="monotone"
              dataKey={site}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
          
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParameterChart;