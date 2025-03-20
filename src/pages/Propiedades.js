// src/pages/Propiedades.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Propiedades = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL de tu Google Apps Script
    const url = 'https://script.google.com/macros/s/AKfycbxhiW8_FJ-KHHE2uSP1UHUiOnY1PpRFGkEfu3PAQL64dAcVjuNXyN_Jh9TDvjZ2kjCU_Q/exec?action=getProperties';
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener propiedades:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
        <div className='propiedadesContainer'>
            <div className="spacerProps"></div>
            <div className="propiedades-page">
                {/* BORDES copiados tal cual del Home */}
                <div className="borders">
                <div className="border-top border-top-left"></div>
                <div className="border-top border-top-right"></div>
                <div className="border-right border-right-top"></div>
                <div className="border-right border-right-bottom"></div>
                <div className="border-bottom border-bottom-left"></div>
                <div className="border-bottom border-bottom-right"></div>
                <div className="border-left border-left-top"></div>
                <div className="border-left border-left-bottom"></div>
                </div>

                <section className="contenido-propiedades">
                <h2>Cargando propiedades...</h2>
                </section>
            </div>
            <div className="spacerProps"></div>
        </div>
      
    );
  }

  return (
    <div className='propiedadesContainer'>
        <div className="spacerProps"></div>
        <div className="propiedades-page">
        {/* BORDES copiados tal cual del Home */}
        <div className="borders">
            <div className="border-top border-top-left"></div>
            <div className="border-top border-top-right"></div>
            <div className="border-right border-right-top"></div>
            <div className="border-right border-right-bottom"></div>
            <div className="border-bottom border-bottom-left"></div>
            <div className="border-bottom border-bottom-right"></div>
            <div className="border-left border-left-top"></div>
            <div className="border-left border-left-bottom"></div>
        </div>

        <section className="contenido-propiedades">
            <h1>Propiedades Destacadas</h1>

            <div className="propiedades-grid">
            {properties.map((prop) => (
                <div className="propiedad-card" key={prop.ID}>
                <Link to={`/propiedades/${prop.ID}`} className="imagen-container">
                    <img
                    src={prop.ImgPrincipal || ''}
                    alt={prop.Título || 'Propiedad'}
                    className="imagen-principal"
                    />

                    {/* Overlay que aparece al hacer hover */}
                    <div className="overlay-info">
                    <h3>{prop.Título}</h3>
                    <p>{prop.Tipo} - {prop['Superficie Total']} m²</p>
                    <p>Habitaciones: {prop.Habitaciones}</p>
                    <p>Baños: {prop.Baños}</p>
                    <p>Precio: {prop['Precio de Venta']}</p>
                    </div>
                </Link>
                </div>
            ))}
            </div>
        </section>
        <div className='botonContainer'>
           <a href="https://century21.com.ar/v/resultados/oficina_61-dosil_local"target="_blank"rel="noopener noreferrer"> 
           <button>Ver más propiedades</button></a>
        </div>
        
        </div>
        <div className="spacerProps"></div>
    </div>
    
  );
};

export default Propiedades;