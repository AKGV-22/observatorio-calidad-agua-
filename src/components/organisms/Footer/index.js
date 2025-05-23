import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Observatorio de Calidad del Agua</h3>
              <p className="text-sm text-gray-300">
                Fusagasugá, Cundinamarca<br />
                Colombia
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Contacto</h3>
              <p className="text-sm text-gray-300">
                EMSERFUSA E.S.P.<br />
                Avenida Las Palmas No.4-66<br />
                Tel: 867 98 77<br />
                observatorio@emserfusa.com.co
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Enlaces</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><Link to="/" className="hover:text-blue-300">Inicio</Link></li>
                <li><Link to="/datos" className="hover:text-blue-300">Datos de calidad</Link></li>
                <li><Link to="/analisis" className="hover:text-blue-300">Análisis Comparativo</Link></li>
                <li><Link to="/acerca-de" className="hover:text-blue-300">Acerca del observatorio</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-center text-gray-400">
            <p>© 2024 Observatorio de Calidad del Agua de Fusagasugá. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;