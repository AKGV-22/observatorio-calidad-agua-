import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';

// Importar páginas correctamente
import HomePage from './pages/HomePage';
import DataExplorerPage from './pages/DataExplorerPage';
import ParameterDetailPage from './pages/ParameterDetailPage';
import AnalysisPage from './pages/AnalysisPage'; // Reemplazamos MapPage por AnalysisPage
import AboutPage from './pages/AboutPage';
import WaterSourcePage from './pages/WaterSourcePage';
import MonitoringSitePage from './pages/MonitoringSitePage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datos" element={<DataExplorerPage />} />
          <Route path="/parametro/:parameterId" element={<ParameterDetailPage />} />
          <Route path="/analisis" element={<AnalysisPage />} /> {/* Reemplazamos /mapa por /analisis */}
          <Route path="/acerca-de" element={<AboutPage />} />
          <Route path="/fuente/:sourceId" element={<WaterSourcePage />} />
          <Route path="/sitio/:siteId" element={<MonitoringSitePage />} />
          <Route path="/informes" element={<ReportsPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;