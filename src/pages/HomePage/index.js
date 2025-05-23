import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';
import HeroSection from '../../components/organisms/HeroSection';
import Map from '../../components/organisms/Map';
import { useData } from '../../contexts/DataContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { waterSources, parameters, qualityData, loading, error } = useData();
  const [latestData, setLatestData] = useState([]);
  
  // Procesar datos más recientes para cada parámetro y sitio
  useEffect(() => {
    if (qualityData && qualityData.length > 0) {
      // Agrupar datos por parámetro y sitio, y obtener el más reciente
      const latestByParamAndSite = {};
      
      qualityData.forEach(item => {
        const key = `${item.parameterId}-${item.siteId}`;
        if (!latestByParamAndSite[key] || new Date(item.date) > new Date(latestByParamAndSite[key].date)) {
          latestByParamAndSite[key] = item;
        }
      });
      
      // Convertir a array
      const latestDataArray = Object.values(latestByParamAndSite);
      setLatestData(latestDataArray);
    }
  }, [qualityData]);
  
  // Contenido para la sección hero
  const heroContent = {
    title: 'Información transparente sobre el agua de Fusagasugá',
    description: 'Monitoreando la calidad del agua de los ríos Cuja y Barro Blanco para garantizar la sostenibilidad del recurso hídrico y el bienestar de nuestra comunidad.',
    primaryButton: {
      text: 'Ver datos actuales',
      onClick: () => navigate('/datos')
    },
    secondaryButton: {
      text: 'Conocer más',
      onClick: () => navigate('/acerca-de')
    }
  };
  
  // Función para obtener la última fecha de actualización
  const getLastUpdateDate = () => {
    if (!qualityData || qualityData.length === 0) return 'No disponible';
    
    const dates = qualityData.map(item => new Date(item.date));
    const latestDate = new Date(Math.max(...dates));
    
    return latestDate.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Función para obtener los parámetros críticos
  const getCriticalParameters = () => {
    if (!qualityData || !parameters) return [];
    
    const criticalParams = latestData.filter(item => item.status !== 'óptimo')
      .map(item => {
        const param = parameters.find(p => p.id === item.parameterId);
        return {
          ...item,
          name: param ? param.name : 'Desconocido',
          unit: param ? param.unit : ''
        };
      });
    
    return criticalParams.slice(0, 3); // Retornamos solo los 3 más críticos
  };
  
  return (
    <MainLayout>
      {/* Sección hero - mantiene el componente existente */}
      <HeroSection 
        title={heroContent.title}
        description={heroContent.description}
        primaryButton={heroContent.primaryButton}
        secondaryButton={heroContent.secondaryButton}
      />
      
      {/* ¿Qué es el observatorio? */}
      <section className="container mx-auto px-4 mb-12 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Qué es el Observatorio de Calidad del Agua?</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                El Observatorio de Calidad del Agua de Fusagasugá es una plataforma digital que centraliza, 
                estandariza y democratiza el acceso a la información sobre la calidad del agua en las principales 
                fuentes hídricas del municipio.
              </p>
              <p className="text-gray-700 mb-4">
                Actualmente, los datos sobre calidad del agua se encuentran fragmentados entre diversas 
                entidades como EMSERFUSA y la CAR, lo que dificulta su seguimiento y análisis. Este observatorio 
                busca solucionar este problema proporcionando una única fuente de información confiable y 
                fácil de entender.
              </p>
              <p className="text-gray-700">
                Con base en el Decreto 1575 de 2007 y la Resolución 2115 de 2007, monitoreamos parámetros 
                clave del agua cruda y los presentamos de manera clara para todos los ciudadanos.
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-6">
              <h3 className="font-bold text-lg text-blue-800 mb-4">Nuestros objetivos</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Centralizar datos de calidad del agua de diferentes entidades</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visualizar información técnica en formatos accesibles para la comunidad</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Promover la participación ciudadana en la gestión del recurso hídrico</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Alertar sobre anomalías que requieren tratamiento especial</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apoyar la toma de decisiones basada en evidencia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fuentes hídricas */}
      <section className="bg-gray-100 py-12 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Fuentes hídricas monitoreadas</h2>
          
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          ) : loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Cargando datos de fuentes hídricas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {waterSources && waterSources.map((source, index) => (
                <div key={source.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div 
                    style={{
                      height: "160px", 
                      backgroundColor: source.name?.includes("Cuja") ? "#90CDF4" : "#9AE6B4"
                    }} 
                    className="bg-center bg-cover" 
                  />
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${source.name?.includes("Cuja") ? "text-blue-700" : "text-green-700"} mb-2`}>
                      {source.name || 'Fuente hídrica'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {source.description || 
                        (source.name?.includes("Cuja") 
                          ? "Principal fuente de abastecimiento para el acueducto de Fusagasugá." 
                          : "Fuente secundaria que complementa el suministro de agua para el municipio."
                        )
                      } 
                      Su bocatoma está ubicada en la vereda {source.location?.district || (source.name?.includes("Cuja") ? "Alto del Molino" : "Providencia")}, 
                      con coordenadas {source.location?.coordinates || (source.name?.includes("Cuja") ? "N:4°18′34″ - W:74°20′31″" : "N:4°22′56.93″ - W:74°18′49.88″")}.
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>Caudal promedio: {source.flowRate || (source.name?.includes("Cuja") ? "120" : "85")} L/s</span>
                      <span>Distancia: {source.distance || (source.name?.includes("Cuja") ? "8.3" : "11.2")} km al casco urbano</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/datos?source=${source.name?.includes("Cuja") ? "rio-cuja" : "quebrada-honda"}`)}
                      className={`inline-block ${source.name?.includes("Cuja") ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded-lg transition`}
                    >
                      Ver datos de calidad
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Fallback si no hay datos de fuentes */}
              {(!waterSources || waterSources.length === 0) && !loading && (
                <>
                  {/* Río Cuja (fallback) */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div style={{height: "160px", backgroundColor: "#90CDF4"}} className="bg-center bg-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Río Cuja</h3>
                      <p className="text-gray-600 mb-4">
                        Principal fuente de abastecimiento para el acueducto de Fusagasugá. Su bocatoma está ubicada 
                        en la vereda Alto del Molino, con coordenadas N:4°18′34″ - W:74°20′31″.
                      </p>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>Caudal promedio: 120 L/s</span>
                        <span>Distancia: 8.3 km al casco urbano</span>
                      </div>
                      <button 
                        onClick={() => navigate('/datos?source=rio-cuja')}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Ver datos de calidad
                      </button>
                    </div>
                  </div>
                  
                  {/* Quebrada Honda (Barro Blanco) (fallback) */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div style={{height: "160px", backgroundColor: "#9AE6B4"}} className="bg-center bg-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-green-700 mb-2">Quebrada Honda (Barro Blanco)</h3>
                      <p className="text-gray-600 mb-4">
                        Fuente secundaria que complementa el suministro de agua para el municipio. Su bocatoma está ubicada 
                        en la vereda Providencia, con coordenadas N:4°22′56.93″ - W:74°18′49.88″.
                      </p>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>Caudal promedio: 85 L/s</span>
                        <span>Distancia: 11.2 km al casco urbano</span>
                      </div>
                      <button 
                        onClick={() => navigate('/datos?source=quebrada-honda')}
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Ver datos de calidad
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Mapa - mantiene el componente existente */}
      <section className="bg-gray-100 py-12 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ubicaciones de monitoreo</h2>
          <div className="mb-4 relative">
            <Map height={400} interactive={true} />
            
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
          </div>
          <div className="text-center">
            <button 
              onClick={() => navigate('/mapa')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ver mapa completo
            </button>
          </div>
        </div>
      </section>
      
      {/* Soluciones que ofrece */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Soluciones que ofrece el observatorio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-center mb-2">Monitoreo Centralizado</h3>
            <p className="text-gray-600 text-center">
              Centraliza datos de diferentes entidades (EMSERFUSA, CAR) en un solo lugar, 
              eliminando la fragmentación de la información.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-center mb-2">Alerta Temprana</h3>
            <p className="text-gray-600 text-center">
              Identifica parámetros fuera de rango según la Resolución 2115, 
              señalando cuando se requiere tratamiento específico.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-center mb-2">Participación Ciudadana</h3>
            <p className="text-gray-600 text-center">
              Permite a la comunidad acceder a información técnica en formatos 
              fáciles de entender, promoviendo la participación.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA - mantiene la navegación existente */}
      <section className="bg-blue-600 text-white py-8 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Conoce el estado actual del agua en Fusagasugá</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Accede a información actualizada sobre la calidad del agua en nuestras fuentes hídricas 
            y comprende los parámetros que afectan este recurso vital.
          </p>
          <button 
            onClick={() => navigate('/datos')}
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Explorar datos ahora
          </button>
        </div>
      </section>
      
      {/* Marco legal */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Marco normativo</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Decreto 1575 de 2007</h3>
              <p className="text-gray-600 text-sm">
                "Por el cual se establece el Sistema para la Protección y Control de la Calidad 
                del Agua para Consumo Humano" - Este decreto respalda la necesidad de monitorear 
                la calidad del agua desde la fuente de abastecimiento.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Resolución 2115 de 2007</h3>
              <p className="text-gray-600 text-sm">
                "Por medio de la cual se señalan características, instrumentos básicos y frecuencias 
                del sistema de control y vigilancia para la calidad del agua para consumo humano" - 
                Define los valores de referencia para todos los parámetros.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;