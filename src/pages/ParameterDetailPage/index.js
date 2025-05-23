import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';
import ParameterChart from '../../components/organisms/ParameterChart';
import ComparisonChart from '../../components/organisms/ComparisonChart';
import { useData } from '../../contexts/DataContext';
import { formatLongDate } from '../../utils/dateFormatters';

const ParameterDetailPage = () => {
  const { parameterId } = useParams();
  const navigate = useNavigate();
  const { parameters, qualityData, loading, error } = useData();
  
  const [parameter, setParameter] = useState(null);
  const [parameterData, setParameterData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  
  // Cargar los datos del parámetro
  useEffect(() => {
    if (parameters && parameters.length > 0 && parameterId) {
      const selectedParameter = parameters.find(p => p.id === parameterId);
      if (selectedParameter) {
        setParameter(selectedParameter);
      } else {
        // Parámetro no encontrado
        console.error(`Parámetro no encontrado: ${parameterId}`);
      }
    }
  }, [parameters, parameterId]);
  
  // Filtrar los datos de calidad para este parámetro
  useEffect(() => {
    if (qualityData && qualityData.length > 0 && parameterId) {
      const filteredData = qualityData.filter(item => item.parameterId === parameterId);
      
      // Ordenar por fecha
      const sortedData = [...filteredData].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setParameterData(sortedData);
      
      // Obtener los datos más recientes para cada sitio
      const latestBySite = {};
      sortedData.forEach(item => {
        if (!latestBySite[item.siteId] || new Date(item.date) > new Date(latestBySite[item.siteId].date)) {
          latestBySite[item.siteId] = item;
        }
      });
      
      setLatestData(Object.values(latestBySite));
    }
  }, [qualityData, parameterId]);
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'óptimo': return 'bg-green-100 text-green-800';
      case 'aceptable': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-red-100 text-red-800';
      case 'bajo': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigate('/datos')}
            className="text-blue-600 hover:underline"
          >
            ← Volver a Datos
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Navegación */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/datos')}
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Datos
          </button>
        </div>
        
        {loading || !parameter ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Cargando información del parámetro...</p>
          </div>
        ) : (
          <>
            {/* Encabezado del parámetro */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{parameter.name}</h1>
                  <p className="text-gray-600 mt-2">{parameter.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Categoría: {parameter.category}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Unidad de medida</h3>
                  <p>{parameter.unit}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Límite legal</h3>
                  <p>
                    {parameter.legalLimit.min && `Mínimo: ${parameter.legalLimit.min} ${parameter.unit}`}
                    {parameter.legalLimit.min && parameter.legalLimit.max && ' / '}
                    {parameter.legalLimit.max && `Máximo: ${parameter.legalLimit.max} ${parameter.unit}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Ref: {parameter.legalLimit.reference}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Interpretación</h3>
                  <div className="space-y-2">
                    {parameter.interpretation.map((interp, index) => (
                      <div key={index} className={`px-2 py-1 rounded text-xs ${getStatusColor(interp.status)}`}>
                        {interp.status.charAt(0).toUpperCase() + interp.status.slice(1)}: {interp.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Datos actuales */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Valores actuales</h2>
            
            {latestData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {latestData.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg mb-2">{item.siteName}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-3xl font-bold text-blue-700">
                        {item.value} <span className="text-sm font-normal">{parameter.unit}</span>
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Última medición: {formatLongDate(item.date)}
                    </p>
                    <button 
                      onClick={() => navigate(`/sitio/${item.siteId}`)}
                      className="mt-4 text-blue-600 text-sm hover:underline"
                    >
                      Ver sitio de monitoreo →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8">
                No hay datos recientes disponibles para este parámetro.
              </div>
            )}
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Evolución histórica</h2>
                <ParameterChart 
                  data={parameterData} 
                  parameter={parameter} 
                  height={350}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Comparación entre sitios</h2>
                <ComparisonChart 
                  data={latestData} 
                  parameter={parameter} 
                  height={350}
                  title="Valores actuales por sitio de monitoreo"
                />
              </div>
            </div>
            
            {/* Tabla de datos */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historial de mediciones</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sitio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parameterData.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatLongDate(item.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.siteName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.value} {parameter.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ParameterDetailPage;