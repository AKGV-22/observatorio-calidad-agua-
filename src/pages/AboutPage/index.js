import React from 'react';
import { Heading, Paragraph } from '../../components/atoms/Typography';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level={1} className="mb-6">Acerca del Observatorio</Heading>
      <Paragraph className="mb-8">
        El Observatorio de Calidad del Agua es una iniciativa para centralizar y democratizar
        el acceso a la información sobre la calidad del agua en Fusagasugá.
      </Paragraph>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <Heading level={2} className="mb-4">Nuestra Misión</Heading>
        <Paragraph>
          Proporcionar información confiable, accesible y actualizada sobre la calidad del agua
          en nuestra región, facilitando la toma de decisiones basada en evidencia y promoviendo
          la participación ciudadana en la gestión del recurso hídrico.
        </Paragraph>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <Heading level={2} className="mb-4">Fuentes de Datos</Heading>
        <Paragraph>
          Nuestros datos provienen de diversas fuentes, incluyendo EMSERFUSA, la CAR y
          proyectos de monitoreo comunitario. Todos los datos son validados y estandarizados
          siguiendo protocolos internacionales.
        </Paragraph>
      </div>
    </div>
  );
};

export default AboutPage;