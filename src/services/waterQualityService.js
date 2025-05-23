// Datos simulados para el desarrollo
import { formatDate } from '../utils/dateFormatters';

// Fuentes de agua
const MOCK_WATER_SOURCES = [
  {
    id: 1,
    name: 'Río Cuja',
    type: 'river',
    description: 'Principal fuente de abastecimiento para el acueducto de Fusagasugá.',
    coordinates: { lat: 4.309306, lng: -74.342528 },
    imageUrl: '/assets/images/rio-cuja.jpg',
    averageFlow: '120 L/s',
    distance: '8.3 km al casco urbano',
    catchmentLocation: 'Vereda Alto del Molino',
    catchmentCoordinates: 'N:4°18′34″ - W:74°20′31″'
  },
  {
    id: 2,
    name: 'Quebrada Honda (Barro Blanco)',
    type: 'stream',
    description: 'Fuente secundaria que complementa el suministro de agua para el municipio.',
    coordinates: { lat: 4.382481, lng: -74.313856 },
    imageUrl: '/assets/images/quebrada-honda.jpg',
    averageFlow: '85 L/s',
    distance: '11.2 km al casco urbano',
    catchmentLocation: 'Vereda Providencia',
    catchmentCoordinates: 'N:4°22′56.93″ - W:74°18′49.88″'
  }
];

// Sitios de monitoreo
const MOCK_MONITORING_SITES = [
  {
    id: 1,
    name: 'Bocatoma Río Cuja',
    waterSourceId: 1,
    type: 'catchment',
    coordinates: { lat: 4.309306, lng: -74.342528 },
    description: 'Punto de captación principal del acueducto municipal',
    imageUrl: '/assets/images/bocatoma-cuja.jpg'
  },
  {
    id: 2,
    name: 'Puente Aguadita - Río Cuja',
    waterSourceId: 1,
    type: 'monitoring',
    coordinates: { lat: 4.323456, lng: -74.334567 },
    description: 'Punto de monitoreo antes de la zona urbana',
    imageUrl: '/assets/images/puente-aguadita.jpg'
  },
  {
    id: 3,
    name: 'Bocatoma Quebrada Honda',
    waterSourceId: 2,
    type: 'catchment',
    coordinates: { lat: 4.382481, lng: -74.313856 },
    description: 'Punto de captación secundario del acueducto municipal',
    imageUrl: '/assets/images/bocatoma-honda.jpg'
  }
];

// Parámetros de calidad
const MOCK_PARAMETERS = [
  {
    id: 'ph',
    name: 'pH',
    unit: 'unidades',
    description: 'Medida de acidez o alcalinidad del agua',
    legalLimit: {
      min: 6.5,
      max: 9.0,
      reference: 'Resolución 2115 de 2007'
    },
    category: 'físico-químico',
    interpretation: [
      { range: [0, 6.5], status: 'bajo', description: 'Agua ácida, puede causar corrosión' },
      { range: [6.5, 9.0], status: 'óptimo', description: 'Rango óptimo para consumo humano' },
      { range: [9.0, 14], status: 'alto', description: 'Agua alcalina, puede afectar el sabor' }
    ]
  },
  {
    id: 'turbidity',
    name: 'Turbiedad',
    unit: 'NTU',
    description: 'Medida de la claridad del agua',
    legalLimit: {
      max: 2,
      reference: 'Resolución 2115 de 2007'
    },
    category: 'físico',
    interpretation: [
      { range: [0, 2], status: 'óptimo', description: 'Agua clara, apta para consumo' },
      { range: [2, 5], status: 'aceptable', description: 'Requiere tratamiento convencional' },
      { range: [5, Infinity], status: 'alto', description: 'Requiere tratamiento avanzado' }
    ]
  },
  {
    id: 'color',
    name: 'Color Aparente',
    unit: 'UPC',
    description: 'Medida del color del agua',
    legalLimit: {
      max: 15,
      reference: 'Resolución 2115 de 2007'
    },
    category: 'físico',
    interpretation: [
      { range: [0, 15], status: 'óptimo', description: 'Agua incolora, apta para consumo' },
      { range: [15, 30], status: 'aceptable', description: 'Requiere tratamiento básico' },
      { range: [30, Infinity], status: 'alto', description: 'Requiere tratamiento avanzado' }
    ]
  },
  {
    id: 'conductivity',
    name: 'Conductividad',
    unit: 'µS/cm',
    description: 'Capacidad del agua para conducir electricidad',
    legalLimit: {
      max: 1000,
      reference: 'Resolución 2115 de 2007'
    },
    category: 'físico-químico',
    interpretation: [
      { range: [0, 400], status: 'bajo', description: 'Agua con baja mineralización' },
      { range: [400, 1000], status: 'óptimo', description: 'Rango normal para agua potable' },
      { range: [1000, Infinity], status: 'alto', description: 'Alta mineralización, sabor salado' }
    ]
  },
  {
    id: 'total_coliforms',
    name: 'Coliformes Totales',
    unit: 'UFC/100ml',
    description: 'Indicador de contaminación microbiológica',
    legalLimit: {
      max: 0,
      reference: 'Resolución 2115 de 2007'
    },
    category: 'microbiológico',
    interpretation: [
      { range: [0, 0], status: 'óptimo', description: 'Agua segura microbiológicamente' },
      { range: [1, Infinity], status: 'alto', description: 'Agua contaminada, no apta para consumo sin tratamiento' }
    ]
  }
];

// Datos de calidad del agua - últimos 12 meses
const generateQualityData = () => {
  const today = new Date();
  const data = [];
  
  // Para cada sitio de monitoreo
  MOCK_MONITORING_SITES.forEach(site => {
    // Para cada parámetro
    MOCK_PARAMETERS.forEach(param => {
      // Para los últimos 12 meses
      for (let i = 0; i < 12; i++) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        
        // Generar un valor aleatorio dentro de un rango razonable para cada parámetro
        let value;
        switch(param.id) {
          case 'ph':
            value = 6.5 + Math.random() * 2.5; // Entre 6.5 y 9.0
            break;
          case 'turbidity':
            value = Math.random() * 4; // Entre 0 y 4
            break;
          case 'color':
            value = Math.random() * 25; // Entre 0 y 25
            break;
          case 'conductivity':
            value = 200 + Math.random() * 800; // Entre 200 y 1000
            break;
          case 'total_coliforms':
            value = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * 10); // 70% chances de ser 0, o entre 1 y 10
            break;
          default:
            value = Math.random() * 100;
        }
        
        // Calcular el estado según los rangos
        let status = 'óptimo';
        for (const interp of param.interpretation) {
          if (value >= interp.range[0] && value <= interp.range[1]) {
            status = interp.status;
            break;
          }
        }
        
        data.push({
          id: `${site.id}-${param.id}-${i}`,
          siteId: site.id,
          siteName: site.name,
          waterSourceId: site.waterSourceId,
          parameterId: param.id,
          parameterName: param.name,
          value: parseFloat(value.toFixed(2)),
          unit: param.unit,
          date: formatDate(date),
          status: status
        });
      }
    });
  });
  
  return data;
};

const MOCK_QUALITY_DATA = generateQualityData();

// Funciones de exportación que simulan peticiones API
export const fetchWaterSources = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_WATER_SOURCES);
    }, 600); // Simular tiempo de carga
  });
};

export const fetchMonitoringSites = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_MONITORING_SITES);
    }, 500);
  });
};

export const fetchParameters = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PARAMETERS);
    }, 400);
  });
};

export const fetchQualityData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_QUALITY_DATA);
    }, 800);
  });
};

// Funciones específicas para obtener datos filtrados
export const getParameterData = (parameterId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = MOCK_QUALITY_DATA.filter(item => item.parameterId === parameterId);
      resolve(filteredData);
    }, 300);
  });
};

export const getWaterSourceData = (sourceId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = MOCK_QUALITY_DATA.filter(item => item.waterSourceId === sourceId);
      const source = MOCK_WATER_SOURCES.find(src => src.id === sourceId);
      resolve({
        source,
        qualityData: filteredData
      });
    }, 400);
  });
};

export const getMonitoringSiteData = (siteId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = MOCK_QUALITY_DATA.filter(item => item.siteId === siteId);
      const site = MOCK_MONITORING_SITES.find(s => s.id === siteId);
      resolve({
        site,
        qualityData: filteredData
      });
    }, 350);
  });
};