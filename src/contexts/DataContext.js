import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWaterSources, fetchParameters, fetchMonitoringSites, fetchQualityData } from '../services/waterQualityService';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [waterSources, setWaterSources] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [monitoringSites, setMonitoringSites] = useState([]);
  const [qualityData, setQualityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Función para obtener todos los datos necesarios
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [sourcesData, paramsData, sitesData, qualityResults] = await Promise.all([
        fetchWaterSources(),
        fetchParameters(),
        fetchMonitoringSites(),
        fetchQualityData()
      ]);
      
      setWaterSources(sourcesData);
      setParameters(paramsData);
      setMonitoringSites(sitesData);
      setQualityData(qualityResults);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('No se pudieron cargar los datos. Por favor intente nuevamente.');
      setLoading(false);
    }
  };

  // Función para actualizar datos específicos
  const refreshData = async (dataType) => {
    setLoading(true);
    try {
      let data;
      switch(dataType) {
        case 'waterSources':
          data = await fetchWaterSources();
          setWaterSources(data);
          break;
        case 'parameters':
          data = await fetchParameters();
          setParameters(data);
          break;
        case 'monitoringSites':
          data = await fetchMonitoringSites();
          setMonitoringSites(data);
          break;
        case 'qualityData':
          data = await fetchQualityData();
          setQualityData(data);
          break;
        default:
          await fetchAllData();
      }
      setLoading(false);
    } catch (err) {
      setError(`Error al actualizar ${dataType}`);
      setLoading(false);
    }
  };

  // Cargar datos al iniciar la aplicación
  useEffect(() => {
    fetchAllData();
  }, []);

  const value = {
    waterSources,
    parameters,
    monitoringSites,
    qualityData,
    loading,
    error,
    refreshData,
    fetchAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}