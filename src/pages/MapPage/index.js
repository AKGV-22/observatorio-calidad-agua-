import React from 'react';
import MainLayout from '../../components/templates/MainLayout';
import Map from '../../components/organisms/Map';
import { useData } from '../../contexts/DataContext';

const MapPage = () => {
  const { waterSources, monitoringSites, loading, error } = useData();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mapa de Monitoreo</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <p className="text-gray-700">
            Explore los diferentes puntos de monitoreo del Observatorio de Calidad del Agua.
            Haga clic en un punto para ver más detalles sobre los parámetros medidos en esa ubicación.
          </p>
        </div>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Map height={500} interactive={true} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {loading ? (
                <div className="col-span-2 text-center py-8">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
                  <p className="mt-2 text-gray-600">Cargando fuentes y sitios de monitoreo...</p>
                </div>
              ) : (
                <>
                  {/* Lista de fuentes de agua */}
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Fuentes Hídricas Monitoreadas</h2>
                    {waterSources && waterSources.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {waterSources.map(source => (
                          <li key={source.id} className="py-3">
                            <h3 className="font-medium text-blue-700">{source.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                              <span>Caudal promedio: {source.averageFlow}</span>
                              <span>Distancia: {source.distance}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No hay fuentes de agua disponibles</p>
                    )}
                  </div>
                  
                  {/* Lista de sitios de monitoreo */}
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Sitios de Monitoreo</h2>
                    {monitoringSites && monitoringSites.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {monitoringSites.map(site => {
                          // Encontrar la fuente asociada
                          const source = waterSources?.find(s => s.id === site.waterSourceId);
                          
                          return (
                            <li key={site.id} className="py-3">
                              <h3 className="font-medium text-blue-700">{site.name}</h3>
                              <p className="text-xs text-blue-500 mt-1">
                                {source?.name || 'Fuente desconocida'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{site.description}</p>
                              <div className="mt-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  site.type === 'catchment' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {site.type === 'catchment' ? 'Bocatoma' : 'Punto de monitoreo'}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No hay sitios de monitoreo disponibles</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default MapPage;