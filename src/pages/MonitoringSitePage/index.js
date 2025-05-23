import React from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Paragraph } from '../../components/atoms/Typography';

const MonitoringSitePage = () => {
  const { siteId } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level={1} className="mb-6">Sitio de Monitoreo: {siteId}</Heading>
      <Paragraph className="mb-8">
        Información detallada sobre el sitio de monitoreo seleccionado.
      </Paragraph>
      
      {/* Este contenido será implementado en el Paso 3 */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <Paragraph>
          El contenido detallado del sitio de monitoreo será implementado en el Paso 3.
        </Paragraph>
      </div>
    </div>
  );
};

export default MonitoringSitePage;