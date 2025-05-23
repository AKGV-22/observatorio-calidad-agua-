import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../../molecules/Card';
import { Heading, Paragraph, Text } from '../../atoms/Typography';
import Button from '../../atoms/Button';
import DataPoint from '../../molecules/DataPoint';

const WaterSourceCard = ({
  id,
  name,
  image,
  description,
  averageFlow,
  distance,
  lastUpdated,
  parameters = [],
  className = ''
}) => {
  return (
    <Card
      className={`h-full flex flex-col ${className}`}
      hover
    >
      {/* Imagen de la fuente de agua */}
      {image && (
        <div className="h-48 bg-blue-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex-grow flex flex-col">
        {/* Encabezado con nombre de la fuente */}
        <Heading level={3} className="mb-2" color="primary">
          {name}
        </Heading>

        {/* Descripción */}
        <Paragraph size="small" className="mb-4">
          {description}
        </Paragraph>

        {/* Métricas básicas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {averageFlow && (
            <DataPoint
              label="Caudal promedio"
              value={averageFlow}
              unit="L/s"
              size="small"
            />
          )}
          {distance && (
            <DataPoint
              label="Distancia"
              value={distance}
              unit="km"
              size="small"
            />
          )}
        </div>

        {/* Parámetros de calidad destacados */}
        {parameters.length > 0 && (
          <div className="mb-4">
            <Text weight="medium" className="mb-2">Parámetros destacados:</Text>
            <div className="grid grid-cols-2 gap-3">
              {parameters.slice(0, 4).map(param => (
                <DataPoint
                  key={param.id}
                  label={param.name}
                  value={param.value}
                  unit={param.unit}
                  status={param.status}
                  size="small"
                />
              ))}
            </div>
          </div>
        )}

        {/* Última actualización */}
        {lastUpdated && (
          <Text size="small" color="muted" className="mt-auto mb-4">
            Última actualización: {lastUpdated}
          </Text>
        )}

        {/* Enlace a detalles */}
        <div className="mt-auto">
          <Link to={`/fuente/${id}`}>
            <Button variant="primary" fullWidth>
              Ver datos completos
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

WaterSourceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  averageFlow: PropTypes.number,
  distance: PropTypes.number,
  lastUpdated: PropTypes.string,
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      unit: PropTypes.string,
      status: PropTypes.oneOf(['normal', 'good', 'warning', 'critical'])
    })
  ),
  className: PropTypes.string
};

export default WaterSourceCard;