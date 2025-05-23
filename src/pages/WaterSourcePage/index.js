import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';
import ParameterChart from '../../components/organisms/ParameterChart';
import Map from '../../components/organisms/Map';
import { useData } from '../../contexts/DataContext';
import { formatLongDate } from '../../utils/dateFormatters';

const WaterSourcePage = () => {
  const { sourceId } = useParams();
  const navigate = useNavigate();
  const { waterSources, monitoringSites, parameters, qualityData, loading, error } = useData();
  
  const [source, setSource] = useState(null);
  const [sourceSites, setSourceSites] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [parameterData, setParameterData] = useState([]);
  
  // Cargar datos de la fuente de agua
  useEffect(() => {
    if (waterSources && sourceId) {
      const foundSource = waterSources.find(s => s.id === parseInt(sourceId));
      if (foundSource) {
        setSource(foundSource);
      }
    }
  }, [waterSources, sourceId]);
  
  // Cargar sitios asociados a esta fuente
  useEffect(() => {
    if (monitoringSites && sourceId) {
      const sites = monitoringSites.filter(site => site.waterSourceId === parseInt(sourceId));
      setSourceSites(sites);
    }
  }, [monitoringSites, sourceId]);
  
  // Cargar datos de calidad asociados a esta fuente
  useEffect(() => {
    if (qualityData && sourceId) {
      const data = qualityData.filter(item => item.waterSourceId === parseInt(sourceId));
      setSourceData(data);
    }
  }, [qualityData, sourceId]);
  
  // Cuando se selecciona un parámetro, filtrar los datos
  useEffect(() => {
    if (sourceData && selectedParameter) {
      const data = sourceData.filter(item => item.parameterId === selectedParameter);
      setParameterData(data);
    } else {
      setParameterData([]);
    }
  }, [sourceData, selectedParameter]);
  
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
  
  // Obtener parámetros únicos de esta fuente
  const getUniqueParameters = () => {
    if (!sourceData || !parameters) return [];
    
    const paramIds = [...new Set(sourceData.map(item => item.parameterId))];
    return paramIds.map(id => parameters.find(p => p.id === id)).filter(Boolean);
  };
  
  // Obtener el parámetro completo
  const getParameterById = (id) => {
    return parameters?.find(p => p.id === id);
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
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Volver
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
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>
        
        {loading || !source ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Cargando información de la fuente de agua...</p>
          </div>
        ) : (
          <>
            {/* Encabezado de la fuente de agua */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{source.name}</h1>
              <p className="text-gray-600 mb-6">{source.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Información general</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{
                        source.type === 'river' ? 'Río' : 
                        source.type === 'stream' ? 'Quebrada' : 
                        'Otro'
                      }</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Caudal promedio:</span>
                      <span className="font-medium">{source.averageFlow}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Distancia al casco urbano:</span>
                      <span className="font-medium">{source.distance}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Bocatoma</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-medium">{source.catchmentLocation}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Coordenadas:</span>
                      <span className="font-medium">{source.catchmentCoordinates}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Monitoreo</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sitios de monitoreo:</span>
                      <span className="font-medium">{sourceSites.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Parámetros medidos:</span>
                      <span className="font-medium">{getUniqueParameters().length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Última medición:</span>
                      <span className="font-medium">
                        {sourceData.length > 0 
                          ? formatLongDate(sourceData.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date)
                          : 'No disponible'
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Mapa con sitios de monitoreo */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ubicación y sitios de monitoreo</h2>
            <div className="mb-8">
              <Map height={400} interactive={true} />
            </div>
            
            {/* Lista de sitios de monitoreo */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sitios de monitoreo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sourceSites.map(site => (
                <div 
                  key={site.id} 
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/sitio/${site.id}`)}
                >
                  <h3 className="font-semibold text-lg mb-2">{site.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{site.description}</p>
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      site.type === 'catchment' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {site.type === 'catchment' ? 'Bocatoma' : 'Punto de monitoreo'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 text-sm">Ver detalles →</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Visualización de datos de calidad */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Datos de calidad</h2>
            
            {/* Selector de parámetro */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <label className="text-gray-700 mb-2 md:mb-0">Seleccione un parámetro para visualizar:</label>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={selectedParameter || ''}
                  onChange={(e) => setSelectedParameter(e.target.value)}
                >
                  <option value="">Seleccionar parámetro</option>
                  {getUniqueParameters().map(param => (
                    <option key={param.id} value={param.id}>
                      {param.name} ({param.unit})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Gráfico del parámetro seleccionado */}
            {selectedParameter ? (
              <div className="mb-8">
                <ParameterChart 
                  data={parameterData} 
                  parameter={getParameterById(selectedParameter)} 
                  height={400}
                />
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8">
                Seleccione un parámetro para visualizar la gráfica de su evolución.
              </div>
            )}
            
            {/* Tabla de últimos datos */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Últimas mediciones</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parámetro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sitio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sourceData
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 10)
                      .map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer" onClick={() => navigate(`/parametro/${item.parameterId}`)}>
                            {item.parameterName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer" onClick={() => navigate(`/sitio/${item.siteId}`)}>
                            {item.siteName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.value} {item.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatLongDate(item.date)}
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
            
            {/* Enlace a datos completos */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/datos')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Ver todos los datos
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default WaterSourcePage;