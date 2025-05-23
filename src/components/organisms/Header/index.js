import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    // Verificar si la ruta actual coincide con la ruta del enlace
    const isActive = (path) => {
      return location.pathname === path;
    };
    
    // Enlaces de navegación - Reemplazamos "Mapa" por "Análisis Comparativo"
    const navigationLinks = [
      { text: 'Inicio', path: '/' },
      { text: 'Datos', path: '/datos' },
      { text: 'Análisis Comparativo', path: '/analisis' },
      { text: 'Informes', path: '/informes' },
      { text: 'Acerca de', path: '/acerca-de' }
    ];
    
    return (
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <img src="/api/placeholder/40/40" alt="Logo Observatorio" className="w-8 h-8" />
            </div>
            <Link to="/" className="text-xl font-bold">Observatorio de Calidad del Agua</Link>
          </div>
          
          {/* Navegación para escritorio */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className={`px-3 py-2 rounded ${
                      isActive(link.path) 
                        ? 'bg-blue-700 font-medium' 
                        : 'hover:bg-blue-500'
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Botón de menú móvil */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 container mx-auto">
            <ul className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className={`block px-3 py-2 rounded ${
                      isActive(link.path) 
                        ? 'bg-blue-700 font-medium' 
                        : 'hover:bg-blue-500'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    );
  };
  
  export default Header;