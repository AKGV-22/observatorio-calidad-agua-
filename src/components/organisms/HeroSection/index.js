import React from 'react';

const HeroSection = ({ 
  title = 'Información transparente sobre el agua de Fusagasugá', 
  description = 'Monitoreando la calidad del agua de los ríos Cuja y Barro Blanco para garantizar la sostenibilidad del recurso hídrico y el bienestar de nuestra comunidad.',
  primaryButton = {
    text: 'Ver datos actuales',
    onClick: () => {}
  },
  secondaryButton = {
    text: 'Conocer más',
    onClick: () => {}
  },
  backgroundImage = '/api/placeholder/1200/300'
}) => {
  return (
    <section 
      className="bg-blue-700 text-white py-12 mb-8 bg-opacity-90" 
      style={{
        backgroundImage: `url('${backgroundImage}')`, 
        backgroundBlendMode: "overlay", 
        backgroundSize: "cover"
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="max-w-2xl mx-auto mb-6">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={primaryButton.onClick}
            className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            {primaryButton.text}
          </button>
          <button 
            onClick={secondaryButton.onClick}
            className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            {secondaryButton.text}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;