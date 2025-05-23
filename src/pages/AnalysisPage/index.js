import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';
import { useData } from '../../contexts/DataContext';

// Componente para la comparación de parámetros
const ParameterComparison = ({ paramName, rioCujaValue, rioCujaUnit, rioCujaStatus, quebradaHondaValue, quebradaHondaUnit, quebradaHondaStatus, limit }) => {
  return (
    <tr className="border-b">
      <td className="p-3 text-gray-800 font-medium">{paramName}</td>
      <td className="p-3 text-center">
        <span className="font-medium">{rioCujaValue} {rioCujaUnit}</span>
        <span className={`block text-xs mt-1 px-2 py-1 rounded-full inline-block ${rioCujaStatus === 'Cumple' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {rioCujaStatus}
        </span>
      </td>
      <td className="p-3 text-center">
        <span className="font-medium">{quebradaHondaValue} {quebradaHondaUnit}</span>
        <span className={`block text-xs mt-1 px-2 py-1 rounded-full inline-block ${quebradaHondaStatus === 'Cumple' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {quebradaHondaStatus}
        </span>
      </td>
      <td className="p-3 text-gray-700">{limit}</td>
    </tr>
  );
};

const AnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parameters, qualityData, waterSources, loading, error } = useData();
  
  // Obtener el parámetro de la URL para determinar si hay una fuente específica a destacar
  const queryParams = new URLSearchParams(location.search);
  const sourceParam = queryParams.get('source');
  
  // Si viene de un análisis específico, resaltar esa fuente
  const [highlightedSource, setHighlightedSource] = useState(sourceParam);

  // Datos de muestra que más adelante vendrán de la base de datos
  const sampleData = {
    lastUpdate: '16 de diciembre de 2024',
    samplingDate: '9 de septiembre de 2024',
    sources: {
      rioCuja: {
        name: 'Río Cuja',
        coordinates: 'N:4°18\'34" - W:74°20\'31"',
        samplingTime: '10:15 H',
        caudal: '120 L/s',
        distance: '8.3 km',
        description: 'Principal fuente de abastecimiento para el acueducto de Fusagasugá.'
      },
      quebradaHonda: {
        name: 'Quebrada Honda (Barro Blanco)',
        coordinates: 'N:4°22\'56.93" - W:74°18\'49.88"',
        samplingTime: '12:30 H',
        caudal: '85 L/s',
        distance: '11.2 km',
        description: 'Fuente secundaria que complementa el suministro de agua para el municipio.'
      }
    },
    parameters: {
      physical: [
        { 
          name: 'pH', 
          rioCujaValue: '6.84', rioCujaUnit: 'Unidades', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '6.31', quebradaHondaUnit: 'Unidades', quebradaHondaStatus: 'Requiere tratamiento',
          limit: '6.5 - 8.5'
        },
        { 
          name: 'Turbiedad', 
          rioCujaValue: '1.8', rioCujaUnit: 'NTU', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '2.4', quebradaHondaUnit: 'NTU', quebradaHondaStatus: 'Requiere tratamiento',
          limit: 'Máx. 2.0'
        },
        { 
          name: 'Color Aparente', 
          rioCujaValue: '34', rioCujaUnit: 'UPC', rioCujaStatus: 'Requiere tratamiento',
          quebradaHondaValue: '24', quebradaHondaUnit: 'UPC', quebradaHondaStatus: 'Requiere tratamiento',
          limit: 'Máx. 15'
        },
        { 
          name: 'Conductividad', 
          rioCujaValue: '96.1', rioCujaUnit: 'μS/cm', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '25.4', quebradaHondaUnit: 'μS/cm', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 1000'
        },
        { 
          name: 'Temperatura', 
          rioCujaValue: '18.2', rioCujaUnit: '°C', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '18.6', quebradaHondaUnit: '°C', quebradaHondaStatus: 'Cumple',
          limit: 'N/A'
        }
      ],
      chemical: [
        { 
          name: 'Alcalinidad', 
          rioCujaValue: '19', rioCujaUnit: 'mg CaCO3/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '7', quebradaHondaUnit: 'mg CaCO3/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 200'
        },
        { 
          name: 'Dureza Total', 
          rioCujaValue: '25', rioCujaUnit: 'mg CaCO3/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '14', quebradaHondaUnit: 'mg CaCO3/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 300'
        },
        { 
          name: 'Hierro', 
          rioCujaValue: '0.73', rioCujaUnit: 'mg Fe/L', rioCujaStatus: 'Requiere tratamiento',
          quebradaHondaValue: '0.35', quebradaHondaUnit: 'mg Fe/L', quebradaHondaStatus: 'Requiere tratamiento',
          limit: 'Máx. 0.3'
        },
        { 
          name: 'Nitratos', 
          rioCujaValue: '3.1', rioCujaUnit: 'mg NO3-/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '<1.0', quebradaHondaUnit: 'mg NO3-/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 10'
        },
        { 
          name: 'Nitritos', 
          rioCujaValue: '0.17', rioCujaUnit: 'mg NO2-/L', rioCujaStatus: 'Requiere tratamiento',
          quebradaHondaValue: '<0.01', quebradaHondaUnit: 'mg NO2-/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 0.1'
        },
        { 
          name: 'Sulfatos', 
          rioCujaValue: '<10.0', rioCujaUnit: 'mg SO42-/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '<10.0', quebradaHondaUnit: 'mg SO42-/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 250'
        },
        { 
          name: 'Cloruros', 
          rioCujaValue: '<2.0', rioCujaUnit: 'mg Cl-/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '<2.0', quebradaHondaUnit: 'mg Cl-/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 250'
        },
        { 
          name: 'Carbono Orgánico Total', 
          rioCujaValue: '3.94', rioCujaUnit: 'mg COT/L', rioCujaStatus: 'Cumple',
          quebradaHondaValue: '3.94', quebradaHondaUnit: 'mg COT/L', quebradaHondaStatus: 'Cumple',
          limit: 'Máx. 5.0'
        }
      ],
      microbiological: [
        { 
          name: 'Coliformes Totales', 
          rioCujaValue: '8.6×10^5', rioCujaUnit: 'UFC/100 ml', rioCujaStatus: 'Requiere tratamiento',
          quebradaHondaValue: '8.1×10^3', quebradaHondaUnit: 'UFC/100 ml', quebradaHondaStatus: 'Requiere tratamiento',
          limit: '0'
        },
        { 
          name: 'E. Coli', 
          rioCujaValue: '7.5×10^7', rioCujaUnit: 'UFC/100 ml', rioCujaStatus: 'Requiere tratamiento',
          quebradaHondaValue: '3.3×10^1', quebradaHondaUnit: 'UFC/100 ml', quebradaHondaStatus: 'Requiere tratamiento',
          limit: '0'
        }
      ]
    }
  };

  // En el futuro, cuando exista la base de datos:
  useEffect(() => {
    if (qualityData && qualityData.length > 0 && parameters && waterSources) {
      // Aquí se procesarían los datos reales de la base de datos
      // Por ahora usamos los datos de muestra
    }
  }, [qualityData, parameters, waterSources]);

  // Ir a la página de detalle de una fuente específica
  const goToSourceDetail = (source) => {
    navigate(`/datos?source=${source}`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-600">Análisis Comparativo</span>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Análisis Comparativo de Fuentes Hídricas</h1>
            
            {/* Descripción */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <p className="text-gray-700">
                Esta sección presenta una comparación detallada de los parámetros de calidad del agua entre las dos principales fuentes hídricas de Fusagasugá. 
                Los datos corresponden a las muestras tomadas el {sampleData.samplingDate} por ANALQUIM LTDA para EMSERFUSA.
              </p>
            </div>
            
            {/* Tarjetas de las fuentes hídricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Río Cuja */}
              <div className={`bg-white rounded-lg shadow-md overflow-hidden ${highlightedSource === 'rio-cuja' ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="bg-blue-600 text-white p-4">
                  <h2 className="text-xl font-bold">Río Cuja</h2>
                  <p className="text-sm opacity-90">Bocatoma: {sampleData.sources.rioCuja.coordinates}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-3">{sampleData.sources.rioCuja.description}</p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Caudal promedio: {sampleData.sources.rioCuja.caudal}</span>
                    <span>Distancia: {sampleData.sources.rioCuja.distance} al casco urbano</span>
                  </div>
                  <button 
                    onClick={() => goToSourceDetail('rio-cuja')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver detalles completos
                  </button>
                </div>
              </div>
              
              {/* Quebrada Honda */}
              <div className={`bg-white rounded-lg shadow-md overflow-hidden ${highlightedSource === 'quebrada-honda' ? 'ring-2 ring-green-500' : ''}`}>
                <div className="bg-green-600 text-white p-4">
                  <h2 className="text-xl font-bold">Quebrada Honda (Barro Blanco)</h2>
                  <p className="text-sm opacity-90">Bocatoma: {sampleData.sources.quebradaHonda.coordinates}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-3">{sampleData.sources.quebradaHonda.description}</p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Caudal promedio: {sampleData.sources.quebradaHonda.caudal}</span>
                    <span>Distancia: {sampleData.sources.quebradaHonda.distance} al casco urbano</span>
                  </div>
                  <button 
                    onClick={() => goToSourceDetail('quebrada-honda')}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Ver detalles completos
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tabla comparativa - Parámetros Físicos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-50 p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Parámetros Físicos</h2>
                <p className="text-sm text-blue-700">Comparación de características físicas del agua entre las dos fuentes</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left text-gray-600">Parámetro</th>
                      <th className="p-3 text-center text-blue-600">Río Cuja</th>
                      <th className="p-3 text-center text-green-600">Quebrada Honda</th>
                      <th className="p-3 text-gray-600">Resolución 2115</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.parameters.physical.map((param, index) => (
                      <ParameterComparison 
                        key={`physical-${index}`}
                        paramName={param.name}
                        rioCujaValue={param.rioCujaValue}
                        rioCujaUnit={param.rioCujaUnit}
                        rioCujaStatus={param.rioCujaStatus}
                        quebradaHondaValue={param.quebradaHondaValue}
                        quebradaHondaUnit={param.quebradaHondaUnit}
                        quebradaHondaStatus={param.quebradaHondaStatus}
                        limit={param.limit}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Tabla comparativa - Parámetros Químicos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-50 p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Parámetros Químicos</h2>
                <p className="text-sm text-blue-700">Comparación de características químicas del agua entre las dos fuentes</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left text-gray-600">Parámetro</th>
                      <th className="p-3 text-center text-blue-600">Río Cuja</th>
                      <th className="p-3 text-center text-green-600">Quebrada Honda</th>
                      <th className="p-3 text-gray-600">Resolución 2115</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.parameters.chemical.map((param, index) => (
                      <ParameterComparison 
                        key={`chemical-${index}`}
                        paramName={param.name}
                        rioCujaValue={param.rioCujaValue}
                        rioCujaUnit={param.rioCujaUnit}
                        rioCujaStatus={param.rioCujaStatus}
                        quebradaHondaValue={param.quebradaHondaValue}
                        quebradaHondaUnit={param.quebradaHondaUnit}
                        quebradaHondaStatus={param.quebradaHondaStatus}
                        limit={param.limit}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Tabla comparativa - Parámetros Microbiológicos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-50 p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Parámetros Microbiológicos</h2>
                <p className="text-sm text-blue-700">Comparación de presencia de microorganismos entre las dos fuentes</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left text-gray-600">Parámetro</th>
                      <th className="p-3 text-center text-blue-600">Río Cuja</th>
                      <th className="p-3 text-center text-green-600">Quebrada Honda</th>
                      <th className="p-3 text-gray-600">Resolución 2115</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.parameters.microbiological.map((param, index) => (
                      <ParameterComparison 
                        key={`micro-${index}`}
                        paramName={param.name}
                        rioCujaValue={param.rioCujaValue}
                        rioCujaUnit={param.rioCujaUnit}
                        rioCujaStatus={param.rioCujaStatus}
                        quebradaHondaValue={param.quebradaHondaValue}
                        quebradaHondaUnit={param.quebradaHondaUnit}
                        quebradaHondaStatus={param.quebradaHondaStatus}
                        limit={param.limit}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Análisis e interpretación */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Interpretación comparativa</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-blue-700">Río Cuja</h3>
                    <p className="text-gray-700">
                      Presenta mejor calidad en términos de pH y turbiedad, estando dentro de parámetros normales. 
                      Sin embargo, tiene niveles más elevados de nitritos y coliformes, que requieren tratamiento 
                      específico antes de distribución. El color aparente y hierro también superan los límites establecidos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-green-700">Quebrada Honda (Barro Blanco)</h3>
                    <p className="text-gray-700">
                      Presenta valores de pH ligeramente ácidos que requieren ajuste. La turbiedad y el color 
                      aparente también superan los límites ideales. Sin embargo, tiene menores niveles de 
                      nitritos y una carga microbiológica considerablemente menor que el Río Cuja, aunque sigue 
                      requiriendo tratamiento de desinfección.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-purple-700">Tratamiento combinado</h3>
                    <p className="text-gray-700">
                      La planta de tratamiento de EMSERFUSA está diseñada para manejar los parámetros fuera de rango 
                      de ambas fuentes. La mezcla de aguas de ambas fuentes permite un tratamiento más eficiente en 
                      algunos casos, como equilibrar el pH y diluir concentraciones de contaminantes específicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recursos adicionales */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recursos adicionales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-blue-700 mb-2">Proceso de tratamiento</h3>
                  <p className="text-gray-700 mb-3">
                    Conozca cómo se realiza el proceso de potabilización para asegurar 
                    que el agua cumpla con todos los estándares de calidad.
                  </p>
                  <button 
                    onClick={() => navigate('/proceso-tratamiento')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver proceso de tratamiento
                  </button>
                </div>
                
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-700 mb-2">Material educativo</h3>
                  <p className="text-gray-700 mb-3">
                    Descubra información educativa sobre los parámetros de calidad del agua
                    y su importancia para la salud pública.
                  </p>
                  <button 
                    onClick={() => navigate('/informacion-educativa')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Ver material educativo
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AnalysisPage;