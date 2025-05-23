import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../contexts/DataContext';

// Nota: Esta es una implementación simulada de un mapa interactivo
// En un proyecto real, se usaría una biblioteca como Leaflet o Google Maps
// Nota: Esta es una implementación simulada de un mapa interactivo
const Map = ({ height = 400, interactive = true, selectedSiteId = null }) => {
    const { monitoringSites, waterSources, loading } = useData();
    const [activeSite, setActiveSite] = useState(null);
    const navigate = useNavigate();
    
    // Cuando cambia selectedSiteId, actualizar sitio activo
    useEffect(() => {
      if (selectedSiteId && monitoringSites) {
        const site = monitoringSites.find(site => site.id === parseInt(selectedSiteId));
        if (site) {
          setActiveSite(site);
        }
      }
    }, [selectedSiteId, monitoringSites]);
    
    // Simular el clic en un marcador
    const handleMarkerClick = (site) => {
      if (!interactive) return;
      
      setActiveSite(site);
      
      // Opcional: navegar al detalle del sitio si se hace clic en modo interactivo
      if (interactive) {
        setTimeout(() => {
          navigate(`/sitio/${site.id}`);
        }, 300);
      }
    };
    
    // Cerrar popup
    const handleClosePopup = () => {
      setActiveSite(null);
    };
    
    // Mostrar un mapa simulado con marcadores
    return (
      <div 
        className="relative bg-blue-100 rounded-lg shadow-md overflow-hidden"
        style={{ height: `${height}px` }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div className="text-blue-600 animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Imagen de fondo simulando un mapa */}
            <div className="absolute inset-0 bg-blue-100">
              {/* Aquí iría el componente real del mapa */}
              <div className="h-full w-full relative bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500 text-sm">Mapa de Fusagasugá, Cundinamarca</span>
                
                {/* Representación simulada de los sitios de monitoreo */}
                {monitoringSites && monitoringSites.map(site => {
                  // Buscar la fuente de agua asociada
                  const source = waterSources?.find(s => s.id === site.waterSourceId);
                  const isActive = activeSite && activeSite.id === site.id;
                  
                  // Posición simulada (en un mapa real, se usarían coordenadas)
                  const top = `${20 + (site.id * 15)}%`;
                  const left = `${20 + (site.id * 20)}%`;
                  
                  return (
                    <div 
                      key={site.id}
                      className={`absolute w-6 h-6 rounded-full cursor-pointer transform transition hover:scale-110 ${
                        isActive ? 'ring-4 ring-blue-300' : ''
                      } ${
                        site.type === 'catchment' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ top, left }}
                      onClick={() => handleMarkerClick(site)}
                      title={site.name}
                    >
                      {isActive && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg z-10 w-64">
                          <button 
                            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClosePopup();
                            }}
                          >
                            ✕
                          </button>
                          <h4 className="font-semibold mb-1">{site.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{source?.name || 'Fuente desconocida'}</p>
                          <p className="text-xs text-gray-500 mb-2">{site.description}</p>
                          {interactive && (
                            <button 
                              className="text-xs text-blue-600 hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/sitio/${site.id}`);
                              }}
                            >
                              Ver detalles →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Leyenda */}
            <div className="absolute bottom-3 left-3 bg-white p-2 rounded shadow">
              <div className="text-xs font-semibold mb-1">Leyenda</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Bocatoma</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Punto de monitoreo</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default Map;