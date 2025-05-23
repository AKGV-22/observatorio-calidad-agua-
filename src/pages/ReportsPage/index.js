import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/templates/MainLayout';

const ReportsPage = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Informes y Análisis</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 mb-4">
            Esta sección contiene informes detallados sobre la calidad del agua en Fusagasugá.
          </p>
          <p className="text-gray-700">
            Los informes se actualizan periódicamente con la última información disponible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-700 mb-3">Próximamente</h2>
            <p className="text-gray-600">
              Los informes detallados estarán disponibles pronto.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;