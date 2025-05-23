import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';
import { useData } from '../../contexts/DataContext';

// Componente para mostrar un parámetro individual con su valor y estado
const ParameterRow = ({ name, value, unit, status }) => {
  // Determinar el color del estado
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'normal': return 'text-green-600';
      case 'óptimo': return 'text-green-600';
      case 'aceptable': return 'text-yellow-600';
      case 'alto': return 'text-red-600';
      case 'bajo': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Determinar la clase del badge del estado
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'óptimo': return 'bg-green-100 text-green-800';
      case 'aceptable': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-red-100 text-red-800';
      case 'bajo': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex justify-between py-4 border-b">
      <div className="text-gray-800">{name}</div>
      <div className="flex items-center">
        <span className="font-medium mr-3">{value} {unit}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

const DataExplorerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parameters, qualityData, waterSources, loading, error } = useData();
  
  // Obtener el parámetro de la URL para determinar qué fuente mostrar
  const queryParams = new URLSearchParams(location.search);
  const sourceParam = queryParams.get('source');
  
  // Establecer la fuente activa basada en el parámetro de URL o usar 'rio-cuja' como valor predeterminado
  const [activeSource, setActiveSource] = useState(
    sourceParam === 'quebrada-honda' ? 'quebrada-honda' : 'rio-cuja'
  );
  
  // Datos de muestra para cuando no hay datos de la base de datos
  // Estos serán reemplazados por datos reales cuando la base de datos esté implementada
  const sampleData = {
    lastUpdate: '16 de diciembre de 2024',
    samplingDate: '9 de septiembre de 2024',
    rioCuja: {
      name: 'Río Cuja',
      coordinates: 'N:4°18\'34" - W:74°20\'31"',
      samplingTime: '10:15 H',
      physicalParams: [
        { id: 1, name: 'pH', value: '6.84', unit: 'Unidades', status: 'Normal' },
        { id: 2, name: 'Turbiedad', value: '1.8', unit: 'NTU', status: 'Normal' },
        { id: 3, name: 'Color Aparente', value: '34', unit: 'UPC', status: 'Alto' },
        { id: 4, name: 'Conductividad', value: '96.1', unit: 'μS/cm', status: 'Normal' },
        { id: 5, name: 'Temperatura', value: '18.2', unit: '°C', status: 'Normal' },
      ],
      chemicalParams: [
        { id: 6, name: 'Alcalinidad', value: '19', unit: 'mg CaCO3/L', status: 'Normal' },
        { id: 7, name: 'Dureza Total', value: '25', unit: 'mg CaCO3/L', status: 'Normal' },
        { id: 8, name: 'Hierro', value: '0.73', unit: 'mg Fe/L', status: 'Alto' },
        { id: 9, name: 'Nitratos', value: '3.1', unit: 'mg NO3-/L', status: 'Normal' },
        { id: 10, name: 'Nitritos', value: '0.17', unit: 'mg NO2-/L', status: 'Alto' },
        { id: 11, name: 'Sulfatos', value: '<10.0', unit: 'mg SO42-/L', status: 'Normal' },
      ],
      microbiologicalParams: [
        { id: 12, name: 'Coliformes Totales', value: '8.6×10^5', unit: 'UFC/100 ml', status: 'Alto' },
        { id: 13, name: 'E. Coli', value: '7.5×10^7', unit: 'UFC/100 ml', status: 'Alto' },
      ]
    },
    quebradaHonda: {
      name: 'Quebrada Honda (Barro Blanco)',
      coordinates: 'N:4°22\'56.93" - W:74°18\'49.88"',
      samplingTime: '12:30 H',
      physicalParams: [
        { id: 1, name: 'pH', value: '6.31', unit: 'Unidades', status: 'Bajo' },
        { id: 2, name: 'Turbiedad', value: '2.4', unit: 'NTU', status: 'Alto' },
        { id: 3, name: 'Color Aparente', value: '24', unit: 'UPC', status: 'Alto' },
        { id: 4, name: 'Conductividad', value: '25.4', unit: 'μS/cm', status: 'Normal' },
        { id: 5, name: 'Temperatura', value: '18.6', unit: '°C', status: 'Normal' },
      ],
      chemicalParams: [
        { id: 6, name: 'Alcalinidad', value: '7', unit: 'mg CaCO3/L', status: 'Normal' },
        { id: 7, name: 'Dureza Total', value: '14', unit: 'mg CaCO3/L', status: 'Normal' },
        { id: 8, name: 'Hierro', value: '0.35', unit: 'mg Fe/L', status: 'Alto' },
        { id: 9, name: 'Nitratos', value: '<1.0', unit: 'mg NO3-/L', status: 'Normal' },
        { id: 10, name: 'Nitritos', value: '<0.01', unit: 'mg NO2-/L', status: 'Normal' },
        { id: 11, name: 'Sulfatos', value: '<10.0', unit: 'mg SO42-/L', status: 'Normal' },
      ],
      microbiologicalParams: [
        { id: 12, name: 'Coliformes Totales', value: '8.1×10^3', unit: 'UFC/100 ml', status: 'Alto' },
        { id: 13, name: 'E. Coli', value: '3.3×10^1', unit: 'UFC/100 ml', status: 'Alto' },
      ]
    }
  };

  // Actualizar la URL cuando cambie la fuente activa
  const handleSourceChange = (source) => {
    setActiveSource(source);
    navigate(`/datos?source=${source}`, { replace: true });
  };

  // Cuando tengamos datos de la base de datos, podemos procesar y organizar aquí
  useEffect(() => {
    if (qualityData && qualityData.length > 0 && parameters && waterSources) {
      // Procesamiento de datos cuando estén disponibles
      // Este código se activará cuando la base de datos esté implementada
      
      // Por ejemplo, podríamos agrupar los datos por fuente de agua
      // y luego por categoría de parámetro (físico, químico, microbiológico)
      
      // También podríamos extraer la fecha de la última muestra
      
      // Por ahora, dejamos esta sección comentada ya que estamos usando datos de muestra
    }
  }, [qualityData, parameters, waterSources]);

  // Obtener los datos según la fuente activa (usando los datos de muestra por ahora)
  const getCurrentSourceData = () => {
    if (activeSource === 'rio-cuja') {
      return sampleData.rioCuja;
    } else {
      return sampleData.quebradaHonda;
    }
  };

  const currentSourceData = getCurrentSourceData();

  // En el futuro, cuando la base de datos esté implementada, 
  // esta función obtendrá los datos reales en lugar de los datos de muestra
  const getCurrentSourceDataFromDB = () => {
    if (!waterSources || !qualityData) return currentSourceData;
    
    // Aquí iría el código para obtener los datos reales
    // Por ahora, devolvemos los datos de muestra
    return currentSourceData;
  };

  // Función para navegar a la página de análisis comparativo
  const goToAnalysisPage = () => {
    navigate(`/analisis?source=${activeSource}`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-600">Datos Actuales</span>
          </div>
          <div className="text-right text-sm text-gray-600">
            Última actualización: {sampleData.lastUpdate}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* Encabezado */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Datos Actuales de Calidad del Agua</h1>
            
            {/* Descripción */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <p className="text-gray-700">
                Esta sección presenta los datos más recientes de la calidad del agua cruda en las principales fuentes hídricas de Fusagasugá, provenientes del informe de laboratorio realizado por ANALQUIM LTDA proporcionado por EMSERFUSA.
              </p>
              
              {/* Nota informativa */}
              <div className="mt-4 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h3 className="font-semibold text-blue-800">Nota sobre los datos:</h3>
                <p className="text-sm text-blue-800">
                  Los datos mostrados corresponden a muestras puntuales tomadas el {sampleData.samplingDate}. Estos parámetros pueden variar según la temporada, precipitaciones y otros factores ambientales.
                </p>
              </div>
            </div>
            
            {/* Pestañas de fuentes hídricas */}
            <div className="flex mb-6">
              <button
                onClick={() => handleSourceChange('rio-cuja')}
                className={`flex-1 py-3 px-4 text-center rounded-t-lg transition ${
                  activeSource === 'rio-cuja' 
                    ? 'bg-blue-600 text-white font-medium' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Río Cuja
              </button>
              <button
                onClick={() => handleSourceChange('quebrada-honda')}
                className={`flex-1 py-3 px-4 text-center rounded-t-lg transition ${
                  activeSource === 'quebrada-honda' 
                    ? 'bg-green-600 text-white font-medium' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Quebrada Honda (Barro Blanco)
              </button>
            </div>
            
            {/* Información de la fuente hídrica seleccionada */}
            <div className={`p-4 ${activeSource === 'rio-cuja' ? 'bg-blue-600' : 'bg-green-600'} text-white rounded-lg mb-6`}>
              <h2 className="text-xl font-bold mb-2">{currentSourceData.name}</h2>
              <p>Bocatoma {currentSourceData.name} {currentSourceData.coordinates}</p>
              <div className="inline-block mt-3 bg-white/20 px-3 py-1 rounded-full text-sm">
                Fecha de muestreo: {sampleData.samplingDate} {currentSourceData.samplingTime}
              </div>
            </div>
            
            {/* Parámetros Físicos */}
            <div className="mb-8">
              <div className="bg-blue-50 p-3 rounded-t-lg">
                <h3 className="font-bold text-blue-800">Parámetros Físicos</h3>
                <p className="text-xs text-blue-700">Características físicas del agua</p>
              </div>
              <div className="bg-white p-4 rounded-b-lg shadow-md">
                {currentSourceData.physicalParams.map(param => (
                  <ParameterRow 
                    key={param.id}
                    name={param.name}
                    value={param.value}
                    unit={param.unit}
                    status={param.status}
                  />
                ))}
              </div>
            </div>
            
            {/* Parámetros Químicos */}
            <div className="mb-8">
              <div className="bg-blue-50 p-3 rounded-t-lg">
                <h3 className="font-bold text-blue-800">Parámetros Químicos</h3>
                <p className="text-xs text-blue-700">Composición química del agua</p>
              </div>
              <div className="bg-white p-4 rounded-b-lg shadow-md">
                {currentSourceData.chemicalParams.map(param => (
                  <ParameterRow 
                    key={param.id}
                    name={param.name}
                    value={param.value}
                    unit={param.unit}
                    status={param.status}
                  />
                ))}
              </div>
            </div>
            
            {/* Parámetros Microbiológicos */}
            <div className="mb-8">
              <div className="bg-blue-50 p-3 rounded-t-lg">
                <h3 className="font-bold text-blue-800">Parámetros Microbiológicos</h3>
                <p className="text-xs text-blue-700">Presencia de microorganismos</p>
              </div>
              <div className="bg-white p-4 rounded-b-lg shadow-md">
                {currentSourceData.microbiologicalParams.map(param => (
                  <ParameterRow 
                    key={param.id}
                    name={param.name}
                    value={param.value}
                    unit={param.unit}
                    status={param.status}
                  />
                ))}
              </div>
            </div>
            
            {/* Interpretación de resultados */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Interpretación de resultados</h3>
              
              <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                {/* Parámetros que requieren atención */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-red-700">Parámetros que requieren atención</h4>
                    <p className="text-sm text-gray-700">
                      {activeSource === 'rio-cuja' 
                        ? 'Color aparente, presencia de coliformes y niveles de hierro superan los valores ideales para agua potable según la Resolución 2115 de 2007, requiriendo tratamiento específico.'
                        : 'pH ligeramente ácido, turbiedad elevada, color aparente, presencia de coliformes y niveles de hierro requieren procesos de tratamiento para cumplir con la normativa de agua potable.'}
                    </p>
                  </div>
                </div>
                
                {/* Parámetros dentro de rangos aceptables */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-green-700">Parámetros dentro de rangos aceptables</h4>
                    <p className="text-sm text-gray-700">
                      {activeSource === 'rio-cuja' 
                        ? 'Los niveles de alcalinidad, dureza, conductividad y temperatura están dentro de los rangos aceptables para el tratamiento convencional de potabilización.'
                        : 'La alcalinidad, dureza, conductividad y temperatura se encuentran en niveles apropiados para el procesamiento en la planta de tratamiento.'}
                    </p>
                  </div>
                </div>
                
                {/* Importancia del tratamiento */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-blue-700">Importancia del tratamiento</h4>
                    <p className="text-sm text-gray-700">
                      Todos los parámetros señalados como "altos" son tratados adecuadamente en la planta de potabilización de EMSERFUSA antes de la distribución a los usuarios, siguiendo lo establecido en el Decreto 1575 de 2007 y la Resolución 2115 de 2007.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ¿Quieres más información? */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">¿Quieres más información?</h3>
              <p className="text-gray-700 mb-4">
                Explora nuestro análisis comparativo para entender cómo estos valores se relacionan con la normativa vigente.
              </p>
              {/* Aquí está la modificación: navegar a /analisis con el parámetro source */}
              <button 
                onClick={() => navigate(`/analisis?source=${activeSource}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Ver análisis comparativo
              </button>
            </div>
            
            {/* Acceso a datos completos */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Acceso a datos completos</h3>
              <p className="text-gray-700 mb-4">
                Descarga el informe original de laboratorio proporcionado por EMSERFUSA para un análisis más detallado.
              </p>
              <button 
                onClick={() => navigate('/descargar-informe')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Descargar informe completo
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default DataExplorerPage;