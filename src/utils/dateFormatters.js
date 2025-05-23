// Función para formatear fechas en formato local (DD/MM/YYYY)
export const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Función para formatear fechas en formato largo (15 de Junio de 2023)
  export const formatLongDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Obtener mes abreviado (Ene, Feb, etc.)
  export const getShortMonth = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('es-CO', {
      month: 'short'
    });
  };
  
  // Agrupar datos por mes
  export const groupDataByMonth = (data) => {
    const grouped = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      const monthYear = `${date.getMonth()}-${date.getFullYear()}`;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = {
          month: getShortMonth(date),
          year: date.getFullYear(),
          items: []
        };
      }
      
      grouped[monthYear].items.push(item);
    });
    
    return Object.values(grouped).sort((a, b) => {
      const dateA = new Date(`${a.month} ${a.year}`);
      const dateB = new Date(`${b.month} ${b.year}`);
      return dateA - dateB;
    });
  };