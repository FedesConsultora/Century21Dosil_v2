// src/components/DatosSection.js

import React from 'react';
import DatoItem from './DatoItem.js';

const DatosSection = () => {
  const datos = [
    { propiedades: 'Propiedades', entregadas: 'Entregadas', numero: 150 },
    { propiedades: 'Propiedades', entregadas: 'Entregadas', numero: 200 },
    { propiedades: 'Propiedades', entregadas: 'Entregadas', numero: 300 },
    { propiedades: 'Propiedades', entregadas: 'Entregadas', numero: 400 },
  ];

  return (
    <section id="datos" className="datos-section">
      <h2 className='tituloDatos'>¿Por qué elegir<span>nos?</span></h2>
      <div className="datos-container">
        {datos.map((dato, index) => (
          <DatoItem
            key={index}
            propiedades={dato.propiedades}
            entregadas={dato.entregadas}
            numero={dato.numero}
          />
        ))}
      </div>
    </section>
  );
};

export default DatosSection;
