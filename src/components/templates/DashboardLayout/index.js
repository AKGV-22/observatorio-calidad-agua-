import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationLink from '../../molecules/NavigationLink';
import ROUTES from '../../../config/routes';
import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';

const DashboardLayout = ({ 
  children, 
  title,
  breadcrumbs = []
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Barra de navegación con breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="flex text-sm">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <Link to={ROUTES.HOME} className="text-blue-600 hover:text-blue-800">
                        Inicio
                      </Link>
                    </li>
                    {breadcrumbs.map((crumb, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-4 w-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {crumb.to ? (
                          <Link to={crumb.to} className="text-blue-600 hover:text-blue-800">
                            {crumb.text}
                          </Link>
                        ) : (
                          <span className="text-gray-600">{crumb.text}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
            
            {/* Botón de menú móvil */}
            <button 
              type="button"
              className="md:hidden bg-gray-100 p-2 rounded-md text-gray-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex">
        {/* Barra lateral */}
        <aside className={`
          md:w-64 md:flex-shrink-0 md:block
          bg-gray-50 border-r border-gray-200
          ${sidebarOpen ? 'block fixed inset-0 z-40 md:relative' : 'hidden'}
        `}>
          {/* Fondo semi-transparente para móviles */}
          {sidebarOpen && (
            <div 
              className="absolute inset-0 bg-gray-600 bg-opacity-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          <div className="h-full md:h-auto overflow-y-auto md:sticky md:top-0 z-50 bg-gray-50 p-4">
            <nav className="space-y-1">
              <NavigationLink 
                to={ROUTES.DATA_EXPLORER} 
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              >
                Explorador de Datos
              </NavigationLink>
              
              <NavigationLink 
                to={ROUTES.MAP} 
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                }
              >
                Mapa
              </NavigationLink>
              
              <NavigationLink 
                to={ROUTES.REPORTS} 
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              >
                Informes
              </NavigationLink>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Fuentes de agua
                </h3>
                
                <div className="mt-2 space-y-1">
                  <NavigationLink 
                    to="/fuente/rio-cuja" 
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    }
                  >
                    Río Cuja
                  </NavigationLink>
                  
                  <NavigationLink 
                    to="/fuente/quebrada-honda" 
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    }
                  >
                    Quebrada Honda
                  </NavigationLink>
                </div>
              </div>
            </nav>
          </div>
        </aside>
        
        {/* Contenido principal */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string
    })
  )
};

export default DashboardLayout;